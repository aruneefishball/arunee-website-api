const express = require('express')
const router = express.Router()
const userService = require("./userService")

// signup
router.post('/signup', async (req, res) => {
    const result = await userService.signup(req.body)
    if(result.success) {
        res.status(200).json(result)
    }
    res.status(409).json(result)
})

// signin
router.post('/signin', async (req, res) => {
    const {username, password} = req.body
    const result = await userService.signin(username, password)
    if(result.success) {
        res.status(200).json(result)
    }
    res.status(401).json(result)
})

module.exports = router