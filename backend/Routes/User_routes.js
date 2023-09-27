const express = require('express');
const { register_user ,authenticate_user, all_users} = require('../Controler_functions/user_controler');
const { Protect } = require('../Middleware/Autherization_middleware');
const router = express.Router();


// api to register and search user
router.route("/").post(register_user).get(Protect,all_users);
router.route('/login').post(authenticate_user)


module.exports = router;