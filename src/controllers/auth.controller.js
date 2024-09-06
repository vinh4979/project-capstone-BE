import { createRefreshToken, createToken, decodeToken, verifyRefreshToken, verifyToken } from "../configs/jwt.js";
import { responseData } from "../configs/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from 'bcrypt'



const model = initModels(sequelize)
// login
const login = async (req, res) => {
  const { email, pass_word } = req.body;
  const user = await model.users.findOne({ where: { email } });

  if (user) {
    // check password   
    if (bcrypt.compareSync(pass_word, user.pass_word)) {
      let key = new Date().getTime();
      const token = createToken({userID: user.user_id, key});
      const refreshToken = createRefreshToken({userID: user.user_id, key});

      user.refresh_token = refreshToken;
      await model.users.update({refresh_token: refreshToken}, {where: {user_id: user.user_id}});
      responseData(token, "Login success", 200, res);
    } else {
      responseData("", "Password is incorrect", 403, res);
    }
  } else {
    responseData("", "Email is not exist", 403, res);
  }
}

// register
const register = async (req, res) => {
  const { email, pass_word, full_name } = req.body;
  const user = await model.users.findOne({ where: { email } });
  if (user) {
    responseData("", "Email is already exist", 403, res);
  } else {
    const newUser = {
      full_name,
      email,
      pass_word: bcrypt.hashSync(pass_word, 10),
      avatar: "",
      refresh_token: "", 
      face_app_id: "",
      type_user_id: 1,
    }
    await model.users.create(newUser);
    responseData("", "Register success", 200, res);
  }
}


  const refreshToken = async (req, res) => {
    const {token} = req.headers
    const checkToken = verifyToken(token)

    // kiểm tra token có hợp lệ hay không, hay hết hạn
    if (checkToken != null && checkToken.name != "TokenExpiredError") {
        responseData("", "Unathorized", 401, res)
        return
    } 
    
    // verify refresh token
    let tokenDecode = decodeToken(token)

    let getUser = await model.users.findByPk(tokenDecode.data.userID)

    let checkTokenRef = verifyRefreshToken(getUser.refresh_token) 

    if ( checkTokenRef != null) {
        responseData("", "Unathorized refresh token", 401, res)
        return
    }

    let tokenRefDecode = decodeToken(getUser.refresh_token)

    if(tokenRefDecode.data.key != tokenDecode.data.key){
      responseData("", "Unathorized refresh token", 401, res)
      return
    }
  
    let newToken = createToken({userID: tokenDecode.data.userID, key: tokenRefDecode.data.key })
    responseData(newToken, "refresh token thanh cong", 200, res)

    const check = verifyToken(newToken)
    console.log("check",check)
       
    
}

export {
  login, register, refreshToken
}
