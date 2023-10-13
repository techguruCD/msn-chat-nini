const { Sequelize, DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isFilled: {
            type: DataTypes.INTEGER,
            default: 0
        },
        twitter: DataTypes.STRING,
        telegram: DataTypes.STRING,
        wallet: DataTypes.STRING,
        joinReason: DataTypes.STRING
    })
}