const express = require("express");


const { Protect } = require('../Middleware/Autherization_middleware');

const router = express.Router();

router.route("/:chatId").get(Protect, allMessages);
router.route("/").post(protect, sendMessage);

