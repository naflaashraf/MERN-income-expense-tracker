const getToken = require("../utils/getToken")
const verifyToken = require("../utils/verifyToken")

const isLogin = (req, res, next) => {
    //get token from header
    const token = getToken(req)
    //verify token
    const decodedUser = verifyToken(token)
    //save the user into req object
    req.user = decodedUser.id
    if (!decodedUser) {
        return res.json({
            message: 'Invalid token'
        });
    }
    next()
}

module.exports = isLogin