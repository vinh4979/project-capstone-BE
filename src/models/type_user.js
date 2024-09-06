import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class type_user extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    type_user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'type_user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_user_id" },
        ]
      },
    ]
  });
  }
}
