const express = require('express'),
    app = express(),
    {userValidator} = require('./services/validators'),
    UserController = require('./controller/users-controller')

app.use(express.json())

app.get('/hello', (req, res, next)=>{
    res.send('Hello')
})

app.post('/signup', userValidator, UserController.create)

app.listen(4000, () => {
    console.log("Server is started on 4000 port")
})