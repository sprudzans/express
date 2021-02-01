const { User } = require('../models'),
    {validationResult} = require('express-validator'),
    bcryptjs = require('bcryptjs'),
    validateDecorator = require('../services/validate-decorator'),
    {createToken} = require('../services/auth-service')

function create(req, res, next){
    User.findOne({where: {email: req.body.email}})
        .then(user => {
            if (user){
                return Promise.reject({statusCode: 422, message: "This email is already used"})
            } else {
                const {login, password, email} = req.body;
                const salt = bcryptjs.genSaltSync(10);
                const passwordHash = bcryptjs.hashSync(password, salt)
                return User.create({login, password: passwordHash, email})
            }
        })
        .then(user => res.json(user))
        .catch(error => {
            res.status(error.statusCode || 400).json({error: error.message})
        })
}

function login (req, res, next){
    const loginUser = req.body;
    User.login(loginUser).then(createToken).then(token => {
        res.json({token});
        next();
    }).catch(error => {
        res.status(401).json({error})
    })
}

module.exports = validateDecorator({
    create,
    login
})