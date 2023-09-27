const express = require("express");
const { access_chat, fetch_chats, create_group, rename_group, add_to_group, remove_from_group } = require("../Controler_functions/chat_controller");
const { Protect } = require('../Middleware/Autherization_middleware');
const router = express.Router();


// protect middleware to make sure only loged in user can access this route
router.route('/').post(Protect, access_chat); //to acess chat page
router.route('/').get(Protect, fetch_chats); // to fetch chats of the user
router.route("/group").post(Protect, create_group); // to create a group
router.route("/rename").put(Protect, rename_group); // to rename chat
router.route("/groupadd").put(Protect, add_to_group);
router.route("/groupremove").put(Protect, remove_from_group);

module.exports = router;