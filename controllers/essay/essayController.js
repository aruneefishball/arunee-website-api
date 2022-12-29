const express = require('express')
const essayService = require('./essayService')
const authAdmin = require('../../authMiddleware')
const router = express.Router()

// add "ESSAY"
router.post('/add', authAdmin, async (req, res) => {
    const result = await essayService.add(req.body)
    res.status(200).json(result)
})

// get "ESSAY"
router.get('/', async (req, res) => {
    const result = await essayService.getByID(req.query.essayID)
    res.status(200).json(result)
})

router.get('/get-by-name', async (req, res) => {
    const result = await essayService.getByName(req.query.essayName)
    res.status(200).json(result)
})

// get all "ESSAY"
router.get('/list', async (req, res) => {
    const result = await essayService.list()
    res.status(200).json(result)
})

// update "ESSAY"
router.post('/update', authAdmin, async (req, res) => {
    const {essayID, ...essayData} = req.body
    const result = await essayService.updateByPk(essayID, essayData)
    res.status(200).json(result)
})

router.post('/update-order', authAdmin, async (req, res) => {
    const {essayID, essayOrder} = req.body
    const result = await essayService.updateOrder(essayID, essayOrder)
    res.status(200).json(result)
})

module.exports = router