import { decodeToken } from "../configs/jwt.js"
import { responseData } from "../configs/response.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

const model = initModels(sequelize)

const getSaveByUser = async (req, res) => {
    const { token } = req.headers
    const user = decodeToken(token)
    const saves = await model.saves.findAll({
        where: {
            user_id: user.data.userID
        }
    })
    responseData(saves, "Lấy save thành công", 200, res)
}

const savePinDefault = async (req, res) => {
    const { pin_id } = req.body
    const { token } = req.headers

    const user = decodeToken(token)

    if (!pin_id) {
        return responseData("", "Pin id is required", 400, res)
    } 

    const checkSave = await model.saves.findOne({
        where: {
            user_id: user.data.userID,
            pin_id: pin_id
        }
    })
    

    if (checkSave) {
        return responseData("", "Pin already saved", 400, res)
    }
    
    await model.saves.create({
        user_id: user.data.userID,
        board_id: null,
        pin_id: pin_id
    })
    return responseData("", "Pin saved to default board", 200, res)

}

const savePinToBoard = async (req, res) => {
    const { pin_id, board_id } = req.body
    const { token } = req.headers

    const user = decodeToken(token)

    if (!pin_id) {
        return responseData("", "Pin id is required", 400, res)
    }
    const checkPin = await model.pins.findOne({
        where: {
            pin_id
        }
    })

    if (!checkPin) {
        return responseData("", "Pin not found", 400, res)
    }


    if (!board_id) {
        return responseData("", "Board is required", 400, res)
    }

    const board = await model.boards.findOne({
        where: {
             board_id
        }
    })
    if (!board) {
        return responseData("", "Board not found", 400, res)
    }

    const checkSave = await model.saves.findOne({
        where: {
            user_id: user.data.userID,
            pin_id: pin_id
        }
    })

    if (checkSave) {
        return responseData("", "Pin already saved", 400, res)
    }
    
    await model.saves.create({
        user_id: user.data.userID,
        board_id: board.board_id,
        pin_id: pin_id
    })

    return responseData("", "Pin saved to board", 200, res)
}

const savePinToNewBoard = async (req, res) => {
    const { pin_id, board_name } = req.body
    const { token } = req.headers

    const user = decodeToken(token)

    if (!pin_id) {
        return responseData("", "Pin id is required", 400, res)
    }   

    if (!board_name) {
        return responseData("", "Board name is required", 400, res)
    }

    const checkPin = await model.pins.findOne({
        where: {
            pin_id
        }
    })

    if (!checkPin) {
        return responseData("", "Pin not found", 400, res)
    }

    const checkBoard = await model.boards.findOne({
        where: {
            board_name
        }
    })
    // check board name is exist
    if (checkBoard) {
        // check pin is saved to board
        const checkSave = await model.saves.findOne({
            where: {
                user_id: user.data.userID,
                board_id: checkBoard.board_id,
                pin_id: pin_id
            }
        }) 
        if (checkSave) {
            return responseData("", "Pin already saved", 400, res)
        }
        await model.saves.create({
            user_id: user.data.userID,
            board_id: checkBoard.board_id,
            pin_id: pin_id
        })
        return responseData("", "Pin saved to board", 200, res)
    } else {
        await model.boards.create({
            board_name, 
            user_id: user.data.userID
        })

        const newBoard = await model.boards.findOne({
            where: {
                board_name
            }       
        })

        await model.saves.create({
            user_id: user.data.userID,
            board_id: newBoard.board_id,
            pin_id: pin_id
        })

        return responseData("", "Pin saved to new board", 200, res)

    }}

    const unsavePin = async (req, res) => {
        const { pin_id } = req.body
        const { token } = req.headers

        const user = decodeToken(token)

        if (!pin_id) {
            return responseData("", "Pin id is required", 400, res)
        }

        const checkPin = await model.pins.findOne({
            where: {
                pin_id
            }
        })

        if (!checkPin) {
            return responseData("", "Pin not found", 400, res)
        }

        const checkSave = await model.saves.findOne({
            where: {
                user_id: user.data.userID,
                pin_id: pin_id
            }
        })

        if (!checkSave) {
            return responseData("", "Pin not saved", 400, res)
        }

        await model.saves.destroy({
            where: {
                user_id: user.data.userID,
                pin_id: pin_id
            }
        })

        return responseData("", "Pin unsaved", 200, res)
    }

    const updateSaveToBoard = async (req, res) => {
        const { pin_id, board_id } = req.body
        const { token } = req.headers

        const user = decodeToken(token) 

        if (!pin_id) {
            return responseData("", "Pin id is required", 400, res)
        }

        if (!board_id) {
            return responseData("", "Board id is required", 400, res)
        }

        const checkPin = await model.pins.findOne({ 
            where: {
                pin_id
            }
        })

        if (!checkPin) {
            return responseData("", "Pin not found", 400, res)
        }

        const checkBoard = await model.boards.findOne({
            where: {
                board_id
            }
        })

        if (!checkBoard) {
            return responseData("", "Board not found", 400, res)
        }

        const checkSave = await model.saves.findOne({
            where: {
                user_id: user.data.userID,
                pin_id: pin_id
            }
        })

        if (!checkSave) {   
            return responseData("", "Pin not saved", 400, res)
        }

        await model.saves.update({
            board_id
        }, {
            where: {    
                user_id: user.data.userID,
                pin_id: pin_id
            }
        })

        return responseData("", "Pin saved to new board", 200, res)
    }
    
        
export {
    savePinDefault,getSaveByUser,
    savePinToBoard, savePinToNewBoard, unsavePin, updateSaveToBoard
}
