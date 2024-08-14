import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class saves extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    img_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'images',
        key: 'img_id'
      }
    },
    save_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
          { name: "user_id" },
          { name: "img_id" },
        ]
      },
      {
        name: "img_id",
        using: "BTREE",
        fields: [
          { name: "img_id" },
        ]
      },
    ]
  });
  }
}
