import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _boards from  "./boards.js";
import _code from  "./code.js";
import _comments from  "./comments.js";
import _likes from  "./likes.js";
import _pins from  "./pins.js";
import _saves from  "./saves.js";
import _tag_pins from  "./tag_pins.js";
import _type_user from  "./type_user.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const boards = _boards.init(sequelize, DataTypes);
  const code = _code.init(sequelize, DataTypes);
  const comments = _comments.init(sequelize, DataTypes);
  const likes = _likes.init(sequelize, DataTypes);
  const pins = _pins.init(sequelize, DataTypes);
  const saves = _saves.init(sequelize, DataTypes);
  const tag_pins = _tag_pins.init(sequelize, DataTypes);
  const type_user = _type_user.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  saves.belongsTo(boards, { as: "board", foreignKey: "board_id"});
  boards.hasMany(saves, { as: "saves", foreignKey: "board_id"});
  boards.belongsTo(pins, { as: "pin", foreignKey: "pin_id"});
  pins.hasMany(boards, { as: "boards", foreignKey: "pin_id"});
  comments.belongsTo(pins, { as: "pin", foreignKey: "pin_id"});
  pins.hasMany(comments, { as: "comments", foreignKey: "pin_id"});
  likes.belongsTo(pins, { as: "pin", foreignKey: "pin_id"});
  pins.hasMany(likes, { as: "likes", foreignKey: "pin_id"});
  saves.belongsTo(pins, { as: "pin", foreignKey: "pin_id"});
  pins.hasMany(saves, { as: "saves", foreignKey: "pin_id"});
  pins.belongsTo(tag_pins, { as: "tag", foreignKey: "tag_id"});
  tag_pins.hasMany(pins, { as: "pins", foreignKey: "tag_id"});
  users.belongsTo(type_user, { as: "type_user_type_user", foreignKey: "type_user"});
  type_user.hasMany(users, { as: "users", foreignKey: "type_user"});
  boards.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(boards, { as: "boards", foreignKey: "user_id"});
  code.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(code, { as: "codes", foreignKey: "user_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(likes, { as: "likes", foreignKey: "user_id"});
  pins.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(pins, { as: "pins", foreignKey: "user_id"});
  saves.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(saves, { as: "saves", foreignKey: "user_id"});

  return {
    boards,
    code,
    comments,
    likes,
    pins,
    saves,
    tag_pins,
    type_user,
    users,
  };
}
