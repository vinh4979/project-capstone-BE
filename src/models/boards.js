import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class boards extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    board_id: {
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
    board_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pins',
        key: 'pin_id'
      }
    }
  }, {
    sequelize,
    tableName: 'boards',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_id" },
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
