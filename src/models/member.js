import { Sequelize } from "sequelize";
import db from "../config/database.js";
 

const { DataTypes } = Sequelize;
 

const Member = db.define('members', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull:false
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull:true,
    defaultValue:true
  }
},{
  freezeTableName: true,
  timestamps:false
});
Member.associate = function(models) {
  Member.hasOne(models.Transaction)
};


 

export default Member;