const jwt = require('jsonwebtoken'),
    config = require('../config/config')

function createToken(userFromDB) {
    return jwt.sign({id: userFromDB.dataValues.id}, config.secret, {expiresIn: 86400})
}

function verifyToken(req, res, next) {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].replace(/bearer|jwt\s+/i, '');
        jwt.verify(token, config.secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({error: "Ошибка авторизации токена"});
                return;
            }
            req.userId = decodedToken.id;
            next()
        })
    } else {
        res.status(401).json({error: "Токен отсутствует"});
    }
}

module.exports = {
    createToken,
    verifyToken
}