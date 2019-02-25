// password util
var crypto = require('crypto')

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
module.exports = {
    saltHashPassword(userPassword) {
        var salt = genRandomString(16) // Gen random string with 16 character to salt
        var passwordData = sha512(userPassword, salt)
        return passwordData
    }
}