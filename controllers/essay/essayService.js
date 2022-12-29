const db = require("../../database")

class EssayService {
    tableName = 'ESSAY'

    async add(essayInput) {
        const essay = await this.get(essayInput.essayName)
        if(essay) return {success: false, message: "already use essay name."}
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${this.tableName} SET ?`, essayInput, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "add essay success."})
            })
        })
    }

    getByName(essayName) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE essayName = ?`, essayName, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "get essay success.", result: result[0] || null})
            })
        })
    }

    getByID(essayID) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE essayID = ?`, essayID, (error, result) => {
                if(error) throw error
                resolve({success: true, message: "get essay success.", result: result[0] || null})
            })
        })
    }

    getByOrder(essayOrder) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${this.tableName} WHERE essayOrder = ?`, essayOrder, (error, result) => {
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

    async updateByPk(essayID, essayData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${this.tableName} SET ? WHERE essayID = ?`, [essayData, essayID], (error, result) => {
                if(error) throw error
                resolve({success: true, message: "update essay success."})
            })
        })
    }

    async updateOrder(essayID, essayOrder) {
        const targetEssay = await this.getByOrder(essayOrder).then(it => it.result)
        const causeEssay = await this.getByID(essayID).then(it => it.result)
        if(targetEssay) {
            await this.updateByPk(targetEssay.essayID, {essayOrder: causeEssay.essayOrder})
        }
        await this.updateByPk(essayID, {essayOrder})
        return {success: true, message: "update essayOrder success."}
    }
}

module.exports = new EssayService();