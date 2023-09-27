const asyncHandler = require("express-async-handler");
const User = require('../Schemas_Models/user_model.js');
const generate_token = require("../Config/generate_token.js");
const { request } = require("express");
const { response } = require("express");


const register_user = asyncHandler(async(req,res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the feilds" );
    }
 
    // query to see if user already exists
    const user_exists = await User.findOne({ email });

    // If user aready exists
    if (user_exists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const newUser = await User.create(
        {
            name, email, password, pic,
        }
    );

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
            token: generate_token(newUser._id)
        });
    } else {
        res.status(400);
        throw new Error("Failed to create an account");
    }

}); 

// for authorization of user while login
const authenticate_user = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.match_password(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generate_token(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// using queries to make api
// /api/user?search=userName
const all_users = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    // either true return true
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  } : {};

  // search for all users except the one searching
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { register_user , authenticate_user, all_users};

