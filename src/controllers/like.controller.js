import { decodeToken } from "../configs/jwt.js"
import { responseData } from "../configs/response.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

const model = initModels(sequelize)
const createLike = async (req, res) => {
    const {token} = req.headers
    const {pin_id} = req.body   
    const user = decodeToken(token)

    const checkLike = await model.likes.findOne({
        where: {
            pin_id,
            user_id: user.data.userID
        }
    })

    if(checkLike){
        responseData("", "You already liked this pin", 400, res)
        return
    }

    await model.likes.create({
        pin_id,
        user_id: user.data.userID, 
        like_date: new Date()
    })
    responseData("", "Like success", 200, res)
}

const deleteLike = async (req, res) => {
    const {token} = req.headers
    const {like_id} = req.body   
    const user = decodeToken(token)

    await model.likes.destroy({
        where: {
            like_id,
            user_id: user.data.userID
        }
    })
    responseData("", "Unlike success", 200, res)
}

export {
    createLike,
    deleteLike
}   