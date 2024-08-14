import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comments from  "./comments.js";
import _images from  "./images.js";
import _saves from  "./saves.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const comments = _comments.init(sequelize, DataTypes);
  const images = _images.init(sequelize, DataTypes);
  const saves = _saves.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  images.belongsToMany(users, { as: 'user_id_users', through: saves, foreignKey: "img_id", otherKey: "user_id" });
  users.belongsToMany(images, { as: 'img_id_images', through: saves, foreignKey: "user_id", otherKey: "img_id" });
  comments.belongsTo(images, { as: "user", foreignKey: "user_id"});
  images.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  saves.belongsTo(images, { as: "img", foreignKey: "img_id"});
  images.hasMany(saves, { as: "saves", foreignKey: "img_id"});
  images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(images, { as: "images", foreignKey: "user_id"});
  saves.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(saves, { as: "saves", foreignKey: "user_id"});

  return {
    comments,
    images,
    saves,
    users,
  };
}
