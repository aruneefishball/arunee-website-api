const express = require("express");
const cors = require("cors")
const userController = require("./controllers/user/userController")
const essayController = require("./controllers/essay/essayController")

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/v1/user", userController)
app.use("/api/v1/essay", essayController)

app.get("/api/v1", function (req, res) {
	res.status(200).json({
		success: true,
		message: "All you need is love.",
		result: "success"
	})
});

app.listen(process.env.PORT, function () {
	console.log(`Example app listening on port ${process.env.PORT}`);
});
