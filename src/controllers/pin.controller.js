import { Op } from "sequelize"
import cloudinary from "../configs/cloundinary.js"
import { decodeToken } from "../configs/jwt.js"
import { responseData } from "../configs/response.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"


const model = initModels(sequelize)

const createPin = async (req, res) => {
    const {token} = req.headers
    const user = decodeToken(token)

    const { title, description, link, allow_comment, tag_id } = req.body

    const image = req.file.buffer

    const uniqueFilename = `image_${new Date().toISOString().replace(/:/g, '-').split('.')[0]}`; // Tạo tên file theo định dạng ISO và thay thế dấu ":" bằng "-"
    // const uniqueFilename = `avatar_${user.data.userID}`

    if (image) {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'pins', public_id: uniqueFilename }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(image);
        });

        const pin = {
            title,
            description,
            link,
            allow_comment,
            tag_id,
            image: result.secure_url,
            user_id: user.data.userID
        }
        console.log("pin",pin)
        await model.pins.create(pin)
        responseData(pin, "Tạo pin thành công", 200, res)
    } else {
        responseData(null, "Không có ảnh", 400, res)
    }
}

const updatePin = async (req, res) => {
    const { token } = req.headers
    const user = decodeToken(token)

    const { pin_id, title, description, link, allow_comment, tag_id } = req.body
    const image = req.file ? req.file.buffer : null

    // Tìm pin theo id
    const pin = await model.pins.findByPk(pin_id)
    if (!pin) {
        return responseData(null, "Pin không tồn tại", 404, res)
    }

    // Kiểm tra quyền chỉnh sửa
    if (pin.user_id !== user.data.userID) {
        return responseData(null, "Bạn không có quyền chỉnh sửa pin này", 403, res)
    }

    // Nếu có hình ảnh mới, xóa hình ảnh cũ trên Cloudinary
    if (image) {
        if (pin.image) {
            const publicId = pin.image.split('/').pop().split('.')[0]; // Lấy public_id từ URL
            console.log("publicId", publicId); // Thêm log để kiểm tra publicId
            await cloudinary.uploader.destroy( `pins/${publicId}`, { resource_type: 'image' }); // Xóa hình ảnh cũ
        }

        const uniqueFilename = `image_${new Date().toISOString().replace(/:/g, '-').split('.')[0]}`;
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'pins', public_id: uniqueFilename }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(image);
        });
        pin.image = result.secure_url; // Cập nhật URL hình ảnh
    }

    pin.title = title || pin.title;
    pin.description = description || pin.description;
    pin.link = link || pin.link;
    pin.allow_comment = allow_comment !== undefined ? allow_comment : pin.allow_comment;
    pin.tag_id = tag_id || pin.tag_id;

    await pin.save(); // Lưu thay đổi
    responseData(pin, "Cập nhật pin thành công", 200, res)
}

const deletePin = async (req, res) => {
    const { token } = req.headers
    const user = decodeToken(token)
    const { pin_id } = req.body

    // Tìm pin theo id
    const pin = await model.pins.findByPk(pin_id)
    if (!pin) {
        return responseData(null, "Pin không tồn tại", 404, res)
    }
    if(pin.user_id !== user.data.userID){
        return responseData(null, "Bạn không có quyền xóa pin này", 403, res)
    }

    // Xóa hình ảnh trên Cloudinary nếu có
    if (pin.image) {
        const publicId = pin.image.split('/').pop().split('.')[0]; // Lấy public_id từ URL
        await cloudinary.uploader.destroy(`pins/${publicId}`, { resource_type: 'image' }); // Xóa hình ảnh
    }

    await model.pins.destroy({ where: { pin_id } }); // Xóa pin
    responseData(null, "Xóa pin thành công", 200, res)
}

const getAllPin = async (req, res) => {
    const pins = await model.pins.findAll()
    responseData(pins, "Lấy pin thành công", 200, res)
}

const getPinByUser = async (req, res) => {
    const { token } = req.headers
    const user = decodeToken(token)
    const pins = await model.pins.findAll({ where: { user_id: user.data.userID } })
    responseData(pins, "Lấy pin thành công", 200, res)
}

const getPinDetail = async (req, res) => {
    const { pin_id } = req.body
    const pin = await model.pins.findByPk(pin_id)
    responseData(pin, "Lấy pin thành công", 200, res)
}

const getPinBySearch = async (req, res) => {
    const { search } = req.body
    const pins = await model.pins.findAll({ where: { title: { [Op.like]: `%${search}%` } } })
    responseData(pins, "Lấy pin thành công", 200, res)
}




export { createPin, updatePin, deletePin, getAllPin, getPinByUser, getPinDetail, getPinBySearch }