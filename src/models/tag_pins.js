import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tag_pins extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tag_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tag_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tag_pins',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
  }
}
