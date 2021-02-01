const express = require('express'),
    app = express(),
    {body, validationResult} = require('express-validator'),
    bodyParser = require('body-parser'),
    {userValidator, loginValidator} = require('./services/validators'),
    UserController = require('./controller/users-controller');

app.use(express.json())

app.get('/hello', (req, res, next)=>{
    res.send('Hello')
})

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/signup', userValidator, UserController.create)
app.post('/login', loginValidator, UserController.login)

app.listen(4000, () => {
    console.log("Server is started on 4000 port")
})