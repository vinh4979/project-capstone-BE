import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class images extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    img_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    img_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img_link: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    full_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "img_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
