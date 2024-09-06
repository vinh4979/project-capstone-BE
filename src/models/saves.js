import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class saves extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    save_id: {
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
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'boards',
        key: 'board_id'
      }
    }
  }, {
    sequelize,
    tableName: 'saves',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "save_id" },
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
      {
        name: "board_id",
        using: "BTREE",
        fields: [
          { name: "board_id" },
        ]
      },
    ]
  });
  }
}
