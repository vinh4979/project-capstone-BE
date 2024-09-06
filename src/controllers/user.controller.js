import { uploadImage } from "../configs/cloundinary.js";
import { decodeToken } from "../configs/jwt.js";
import { responseData } from "../configs/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

const model = initModels(sequelize);

const getUserDetail = async (req, res) => {
  const {token} = req.headers
  const user = decodeToken(token)
  const checkUser = await model.users.findOne({where: {user_id : user.data.userID}})
  if (!checkUser) {
    responseData("", "User not found", 404, res)
    return
  }
    responseData(checkUser, "Get user success", 200, res)
}

const getUserDetailByID = async (req, res) => {
  const {user_id} = req.params
  console.log("user_id", req.params)
  const checkUser = await model.users.findOne({where: {user_id: user_id}})
  if (!checkUser) {
    responseData("", "User not found", 404, res)
    return
  }
  responseData(checkUser, "Get user success", 200, res)
}

const updateUserDetail = async (req, res) => {
  const {token} = req.headers
  const user = decodeToken(token)
  const {full_name, pass_word, email} = req.body
  const image = req.file.buffer
  const checkUser = await model.users.findOne({where: {user_id: user.data.userID}})
  if (!checkUser) {
    responseData("", "User not found", 404, res)
    return
  }

    const avatar = await uploadImage("avatar", user.data.userID, image)

    const updateUser = {
      full_name: full_name || checkUser.full_name,
      pass_word: pass_word ? bcrypt.hashSync(pass_word, 10) : checkUser.pass_word,
      avatar: avatar.secure_url || checkUser.avatar,
      email: email || checkUser.email, 
      image: avatar.secure_url || checkUser.image,
  }

   await model.users.update(updateUser, {where: {user_id: user.data.userID}})
   responseData("", "Update user success", 200, res)
}
  
   
  // const deleteUser = async (req, res) => {
  //   const {token} = req.headers
  //   const {user_id} = req.params
  //   const user = decodeToken(token)
  //   console.log("user_id", user_id)
  //   const getUser = await model.users.findOne({where: {user_id}})
  //   if (!getUser) {
  //     responseData("", "User not found", 404, res)
  //     return
  //   }
  //   if (getUser.type_user_id == "ADMIN" || getUser.user_id == user_id) {
  //     await model.users.destroy({where: {user_id}})
  //     responseData("", "Delete user success", 200, res)
  //     return
  //   } else {
  //     responseData("", "You are not allowed to delete this user", 403, res)
  //     return
  //   }
  // }

export { getUserDetail, updateUserDetail, getUserDetailByID };
