const { Sequelize } = require('sequelize')
const { mysqlConfig } = require('../config/getConfig')

// mysql
const sequelize = new Sequelize({
    database: mysqlConfig.database,
    username: mysqlConfig.username,
    password: mysqlConfig.password,
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
    logging: console.log,
})

// 测试连接
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('MySQL client connected')
//     })
//     .catch((e) => {
//         console.error('Unable to connect to MySQL', e)
//     })

module.exports = sequelize
