import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class comments extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cmt_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    pin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pins',
        key: 'pin_id'
      }
    },
    cmt_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cmt: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cmt_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "pin_id",
        using: "BTREE",
        fields: [
          { name: "pin_id" },
        ]
      },
    ]
  });
  }
}
