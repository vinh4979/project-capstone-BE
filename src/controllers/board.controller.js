import { decodeToken } from "../configs/jwt.js";
import { responseData } from "../configs/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";


const model = initModels(sequelize)
const createBoard = async (req, res) => {
    const {token} = req.headers
    const {board_name} = req.body

    const user = decodeToken(token)

    const checkBoard = await model.boards.findOne({
        where: {
            user_id: user.data.userID,
            board_name
        }
    })

    if (checkBoard) {
        return responseData("", "Board already exists", 400, res)
    }

    await model.boards.create({
        user_id: user.data.userID,
        board_name
    })

    responseData("", "Board created", 200, res)
}

const updateBoardName = async (req, res) => {
    const {token} = req.headers
    const {board_id, new_board_name} = req.body

    const user = decodeToken(token)

    const checkBoard = await model.boards.findOne({
        where: {
            user_id: user.data.userID,
            board_id
        }
    })

    if (!checkBoard) {
        return responseData("", "Board not found", 400, res)
    }
    if (user.data.userID !== checkBoard.user_id) {
        return responseData("", "You are not allowed to update this board", 400, res)
    }

    await model.boards.update({
        board_name: new_board_name
    }, {
        where: {
            board_id
        }       
    })

    responseData("", "Board updated", 200, res) 
}

const deleteBoard = async (req, res) => {
    const {token} = req.headers
    const {board_id} = req.body

    const user = decodeToken(token)

    const checkBoard = await model.boards.findOne({
        where: {
            user_id: user.data.userID, 
            board_id    
        }
    })

    if (!checkBoard) {
        return responseData("", "you are not allowed to delete this board", 400, res)
    }

    // Cập nhật tất cả save_id tìm được về null
    await model.saves.update(
        { board_id: null }, // Đặt board_id thành null
        { where: { board_id: checkBoard.board_id } } // Điều kiện cập nhật
    );

    console.log("checkBoard",checkBoard.board_name)
    await model.boards.destroy({
        where: {
            board_id : checkBoard.board_id
        }
    })

    responseData("", "Board deleted", 200, res)
    
}

const getAllBoard = async (req, res) => {
    const {token} = req.headers
    const user = decodeToken(token)

    const boards = await model.boards.findAll({
        where: {
            user_id: user.data.userID
        }
    })
    responseData(boards, "Lấy board thành công", 200, res)
}

const getBoardByUser = async (req, res) => {
    const {token} = req.headers
    const user = decodeToken(token)

    const boards = await model.boards.findAll({
        where: {
            user_id: user.data.userID
        }
    })
    responseData(boards, "Lấy board thành công", 200, res)
}


export { createBoard, updateBoardName, deleteBoard, getAllBoard, getBoardByUser }
