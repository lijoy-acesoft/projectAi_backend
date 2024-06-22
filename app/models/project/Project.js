const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Project = sequelize.define('Project', {

  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // This creates a unique constraint on project_name
  },
  project_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
  dead_line: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


module.exports={Project}