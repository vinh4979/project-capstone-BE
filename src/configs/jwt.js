import jwt from 'jsonwebtoken'

//tạo token
const createToken = (data) => {
    return jwt.sign({data:data}, "node43", {algorithm:"HS256", expiresIn:"2h"})

}

// xác thực token
const verifyToken = (token) => {
    return jwt.verify(token, "node43", (err)=>{return err} )
}

// Giải mã token
const decodeToken = (token) => {
    return jwt.decode(token)
}

// function refresh token

const createRefreshToken = (data) => {
    return jwt.sign({data:data}, "RESET", {algorithm:"HS256", expiresIn:"7d"})
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, "RESET", err => err )
}

const midelwareToken = (req, res, next) => {
    const {token} = req.headers
    const checkToken = verifyToken(token)
    if (checkToken == null) {
        next()
    }
    else {
        res.status(403).json({message: "Token không đúng"})
    }
}   



export {createToken,verifyToken, decodeToken, createRefreshToken, midelwareToken, verifyRefreshToken}