var crypto = require('crypto')
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

// password util
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /* convert to hex format */
        .slice(0, length) /* return required number of characters */
}
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt) // use SHA512
    hash.update(password)
    var value = hash.digest('hex')

    return {
        salt:salt,
        passwordHash: value
    }
}
function saltHashPassword(userPassword) {
    var salt = genRandomString(16) // Gen random string with 16 character to salt
    var passwordData = sha512(userPassword, salt)
    return passwordData
}


var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    console.log('Password: 123456')
    var encrypt = saltHashPassword('123456')
    console.log('Encrypt: ' + encrypt.passwordHash)
    console.log('Salt: ' + encrypt.salt)
})

app.listen(3000, () => {
    console.log('Restful web service running on port 3000')
})