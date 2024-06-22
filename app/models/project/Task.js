// models/Task.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const { Project } = require("./Project"); // Import the Project model

const Task = sequelize.define('Task', {
  task_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  employee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expected_completion: {
    type: DataTypes.INTEGER, // Assuming this is in minutes or hours
    allowNull: false
  },
  per_hour_cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  completion_date_and_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  comments: {
    type: DataTypes.STRING
    // You can specify other constraints for comments if needed
  }
});

// Establishing association with Project
Task.belongsTo(Project, {
  foreignKey: {
    name: 'projectId',
    allowNull: false
  }
});

module.exports = { Task };
