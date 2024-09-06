import { decodeToken } from "../configs/jwt.js"
import { responseData } from "../configs/response.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

const model = initModels(sequelize)
const createComment = async (req, res) => {
   const {token} = req.headers
   const {pin_id, content} = req.body
   const user = decodeToken(token)

   const comment = await model.comments.create({
    pin_id,
    user_id: user.data.userID,
    cmt: content, 
    cmt_date: new Date()
   })
   responseData(comment, "Create comment successfully", 200, res)
    
   }

   const deleteComment = async (req, res) => {
    const {token} = req.headers
    const {cmt_id} = req.body
    const user = decodeToken(token)

    const checkUserComment = await model.comments.findOne({
        where: {
            cmt_id,
            user_id: user.data.userID
        }
    })

    if(!checkUserComment){
        responseData("", "User not allowed to delete this comment", 403, res)
        return
    }

    await model.comments.destroy({
        where: {
            cmt_id
        }
    })
    responseData("", "Delete comment successfully", 200, res)
        
    }
    
   
   export {
    createComment,
    deleteComment
   }
