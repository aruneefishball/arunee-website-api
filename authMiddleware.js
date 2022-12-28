const userService = require("./controllers/user/userService")

async function authAdmin(req, res, next) {
    const jwtPayload = userService.checkAccessToken(req)
    if(jwtPayload) {
        const user = await userService.getByUsername(jwtPayload.username)
        if(user) {
            next()
        }else {
            res.status(401).json({success: false, message: "unauthorized."})
        }
    }else {
        res.status(401).json({success: false, message: "unauthorized."})
    }
}

module.exports = authAdmin