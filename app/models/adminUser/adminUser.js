// models/AdminUser.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Assuming you've configured Sequelize and imported sequelize instance

const AdminUser = sequelize.define('AdminUser', {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adminName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Assuming email should be unique for each admin user
    },
    fax: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plan: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = AdminUser;
