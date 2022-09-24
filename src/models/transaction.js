import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
 

const Transaction = db.define('transactions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
    allowNull:false
  },
  code_transaksi:{
    type: DataTypes.STRING,
    allowNull:false
  },
  code_member:{
    type: DataTypes.STRING,
    references:"Member",
    key:"code",
    allowNull: false
  },
  code_buku:{
    type: DataTypes.STRING,
    references:"Book",
    key:"code",
    allowNull: false
  },
  tanggal_pinjam:{
    type: DataTypes.DATE,
    allowNull: false
  },
  tanggal_kembali:{
    type: DataTypes.DATE,
    allowNull: true
  }
},{
  freezeTableName: true,
  timestamps:false
});
Transaction.associate = function(models) {
  Transaction.belongsTo(models.Book)
};
 

export default Transaction;