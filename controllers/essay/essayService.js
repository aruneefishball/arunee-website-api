const db = require("../../database")

class EssayService {
    tableName = 'ESSAY'

    add(essayInput) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${this.tableName} SET ?`, essayInput, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "add essay success."})
            })
        })
    }

    get(essayName) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE essayName = ?`, essayName, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "get essay success.", result: result[0] || null})
            })
        })
    }

    list() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName}`, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "list essay success.", result})
            })
        })
    }

    updateByPk(essayID, essayData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${this.tableName} SET ? WHERE essayID = ?`, [essayData, essayID], (error, result) => {
                if(error) throw error
                resolve({success: true, message: "update essay success."})
            })
        })
    }
}

module.exports = new EssayService();