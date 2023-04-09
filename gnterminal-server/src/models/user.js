const { DataTypes } = require('sequelize')
const sequelize = require('../db/mysql')

/**
 * user model
 */
const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        createTime: {
            type: DataTypes.DATE,
        },
        updateTime: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'user',
        // paranoid tables 设置 ==> 假删除
        paranoid: false,
        // deletedAt: 'isDelete',
        // 使用 paranoid 启动必须启动 timestamps
        timestamps: false,
        // updatedAt: 'updateTime',
        // createdAt: 'createTime',
    }
)

module.exports = User
