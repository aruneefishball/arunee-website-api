const db = require("../../database")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const SECRET = "aruneeWebsite@API";


class UserService {
    tableName = 'USER'

    generateAccessToken(payload){
        return jwt.sign(payload, SECRET, {"expiresIn": "24h"})
    }

    checkAccessToken(request){
        try {
            const accessToken = request.headers.authorization.split(" ")[1];
            const jwtResposne = jwt.verify(String(accessToken), SECRET);
            return jwtResposne;
        } catch (error) {
            return false;
        }
    }

    getByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE username = ?`, username, (error, result) => {
                if(error) throw error
                resolve(result[0])
            })
        })
    }

    async signup(userInput) {
        const user = await this.getByUsername(userInput.username)
        if(user.length) return {success: false, message: "username is already use."}
        userInput.password = await bcrypt.hash(userInput.password, 10)
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${this.tableName} SET ?`, userInput, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "add user success."})
            })
        })
    }

    async signin(username, password) {
        const user = await this.getByUsername(username)
        if(user) {
            const passwordIsMatch = await bcrypt.compare(password, user.password)
            return new Promise((resolve, reject) => {
                if(passwordIsMatch){
                    resolve({success: true, accessToken: this.generateAccessToken({username})})
                }else{
                    resolve({success: false, message: "username or password is invalid."})
                }
            })
        }
        return {success: false, message: "username or password is invalid."}
        
    }

}

module.exports = new UserService();