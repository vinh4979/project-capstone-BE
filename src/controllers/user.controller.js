import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);
const getUser = async (req, res) => {
  const data = await model.users.findAll();
  res.send(data);
};

export { getUser };
