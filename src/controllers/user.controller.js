import { responseData } from "../configs/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const getUser = async (req, res) => {
  const {user_id} = req.body
  const user = await model.users.findOne({where: {user_id}})
  if (user) {
    responseData(user, "Get user success", 200, res)
  } else {
    responseData("", "User not found", 404, res)
  }
}

const updateUser = async (req, res) => {
    const {user_id, full_name, pass_word, avatar, email, refresh_token, face_app_id, type_user_id} = req.body
    const user = await model.users.findOne({where: {user_id}})
    if (user) {
    const updateUser = {
      full_name: full_name === "" || null || undefined ? user.full_name : full_name,
      pass_word: pass_word === "" || null || undefined ? user.pass_word : bcrypt.hashSync(pass_word, 10),
      avatar: avatar === "" || null || undefined ? user.avatar : avatar,
      email: email === "" || null || undefined ? user.email : email
    }
    await model.users.update(updateUser, {where: {user_id}})
    responseData("", "Update user success", 200, res)
    } else {
      responseData("", "User not found", 404, res)
    }}
  
  
  const deleteUser = async (req, res) => {
    const {user_id} = req.body
    const user = await model.users.findOne({where: {user_id}})
    if (user) {
      await model.users.destroy({where: {user_id}})
      responseData("", "Delete user success", 200, res)
    } else {
      responseData("", "User not found", 404, res)
    }
  }

export { getUser, updateUser, deleteUser };
