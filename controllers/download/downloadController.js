const express = require('express')
const authAdmin = require('../../authMiddleware')
const downloadService = require('./downloadService')
const router = express.Router()

router.post('/add', authAdmin, async (req, res) => {
    const result = await downloadService.add(req.body)
    res.status(200).json(result)
})

router.post('/update', authAdmin, async (req, res) => {
    const {pictureID, ...downloadData} = req.body
    const result = await downloadService.updateByPk(pictureID, downloadData)
    res.status(200).json(result)
})

router.get('/', async (req, res) => {
    const result = await downloadService.getByID(req.query.essayID)
    res.status(200).json(result)
})

router.get('/list', async (req, res) => {
    const result = await downloadService.list()
    res.status(200).json(result)
})

router.post('/delete', authAdmin, async (req, res) => {
    const result = await downloadService.deleteByPk(req.body.pictureID)
    res.status(200).json(result)
})


module.exports = router