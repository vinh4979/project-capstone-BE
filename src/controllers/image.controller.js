import { responseData } from "../configs/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

// get images

const getImg = async (req, res) => {
  const data = await model.images.findAll();
  responseData(data, "get image successfully!", 200, res);
};

export { getImg };
