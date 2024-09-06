import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pins extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pin_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    allowComment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tag_pins',
        key: 'tag_id'
      }
    }
  }, {
    sequelize,
    tableName: 'pins',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pin_id" },
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
        name: "tag_id",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
  }
}
