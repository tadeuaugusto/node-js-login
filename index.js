const pwdUtil = require('./passwordUtil')

var uuid = require('uuid')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var express = require('express')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DemoNodeJS'
})




var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    console.log('Password: 123456')
    var encrypt = pwdUtil.saltHashPassword('123456')
    console.log('Encrypt: ' + encrypt.passwordHash)
    console.log('Salt: ' + encrypt.salt)
})

app.listen(3000, () => {
    console.log('Restful web service running on port 3000')
})