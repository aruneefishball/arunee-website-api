const db = require("../../database")

class DownloadService {
    tableName = 'DOWNLOAD'

    async add(input) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${this.tableName} SET ?`, input, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "add download success."})
            })
        })
    }

    getByID(pictureID) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE pictureID = ?`, pictureID, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "get download success.", result: result[0] || null})
            })
        })
    }

    list() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName}`, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "list download success.", result})
            })
        })
    }

    async updateByPk(pictureID, downloadData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${this.tableName} SET ? WHERE pictureID = ?`, [downloadData, pictureID], (error, result) => {
                if(error) throw error
                resolve({success: true, message: "update download success."})
            })
        })
    }

    deleteByPk(pictureID) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${this.tableName} WHERE pictureID = ?`, pictureID, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "delete download success."})
            })
        })
    }
}

module.exports = new DownloadService();