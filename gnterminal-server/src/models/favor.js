const { DataTypes } = require('sequelize')
const sequelize = require('../db/mysql')

/**
 * user model
 */
const Favor = sequelize.define(
    'Favor',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        // Model attributes are defined here
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        tableName: 'favor',
        // paranoid tables 设置 ==> 假删除
        paranoid: false,
        // deletedAt: 'isDelete',
        // 使用 paranoid 启动必须启动 timestamps
        timestamps: false,
        // updatedAt: 'updateTime',
        // createdAt: 'createTime',
    }
)

module.exports = Favor
