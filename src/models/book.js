import { Sequelize } from "sequelize";
import db from "../config/database.js";
 

const { DataTypes } = Sequelize;
 

const Book = db.define('books', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull:false
  },
  title:{
    type: DataTypes.STRING,
    allowNull:false
  },
  author:{
    type: DataTypes.STRING,
    allowNull:false
  },
  stock:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
},{
  freezeTableName: true,
  timestamps:false
});
Book.associate = function(models) {
  Book.hasOne(models.Transaction)
};
 

export default Book;