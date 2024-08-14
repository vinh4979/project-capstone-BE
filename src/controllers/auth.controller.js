import { responseData } from "../configs/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const login = async (req, res) => {
  const { email, pass_word } = req.body;

  let checkEmail = await model.users.findOne({
    where: {
      email,
    },
  });

  if (checkEmail) {
    if (checkEmail.pass_word === pass_word) {
      let token = "";
      responseData(token, "Đăng nhập thành công", 200, res);
    } else {
      responseData("", "Mật khẩu không đúng !", 403, res);
    }
  } else {
    responseData("", "Email không đúng !", 403, res);
  }
};
const signUp = async (req, res) => {
  const { full_name, pass_word, email } = req.body;

  const newData = {
    full_name,
    email,
    avatar: "",
    pass_word,
  };

  const checkEmail = await model.users.findOne({ where: { email } });

  if (checkEmail) {
    responseData("", "email da ton tai", 401, res);
    return;
  } else {
    await model.users.create(newData);
    responseData("", "dang ki thanh cong", 200, res);
  }
};

export { login, signUp };
