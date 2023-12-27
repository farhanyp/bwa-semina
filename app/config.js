const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    urlDb : process.env.URL_MONGODB_DEV,
    PORT: process.env.PORT,
    jwtExpiration: '24h',
    jwtSecret: 'jwtSecret',
    jwtRefreshTokenExpiration: '24h',
    jwtRefreshTokenSecret: 'jwtSecretRefreshToken',
    gmail: 'farhan.yudha2016we@gmail.com',
    password: 'glet kqgx tjmt bkzu'
}