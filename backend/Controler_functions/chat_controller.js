const asyncHandler = require("express-async-handler");
const User = require('../Schemas_Models/user_model.js');
const Chat = require('../Schemas_Models/chat_model.js');
const { request } = require("express");
const { response } = require("express");

// for fetching one on one chat
const access_chat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with the request");
    }

    var is_chat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
        .populate("latest_message");
    
    is_chat = await User.populate(is_chat, {
        path: "latest_message.sender",
        select: "name pic email",
    });

    // if chat already exists return chat or else create a new one
    if (is_chat.length > 0) {
        res.send(is_chat[0]);
    } else {
        var chat_data = {
            chat_name: "sender",
            isGroup: false,
            users: [req.user._id, userId],
            

        };
    }

    try {
        const created_chat = await Chat.create(chat_data);
        const full_chat = await Chat.findOne({ _id: created_chat._id }).populate("users", "-password");
        res.status(200).send(full_chat);
    } catch (error){
        res.status(400);
        throw new Error(error.message);
    }
});


// to fetch all the chats
// check which user is llogged in and return his/her all chats
const fetch_chats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
      .populate("group_admin", "-password")
            .populate("latest_message")
            .sort({ updatedAt: -1 }) // sort chats newest to oldest
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latest_message.sender",
                    select: "name pic email",
                });
                 res.status(200).send(results);
            })
        
       
    } catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
});


// For creating group chat
const create_group = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

    // parsing string into object
  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
      const group_chat = await Chat.create({
      chat_name: req.body.name,
      users: users,
      isGroup: true,
      group_admin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: group_chat._id })
      .populate("users", "-password")
      .populate("group_admin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// For renaming group
const rename_group = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updated_chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chat_name: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("group_admin", "-password");

  if (!updated_chat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updated_chat);
  }
});

// For adding a user to a group
const add_to_group = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const chat = await Chat.findById(chatId);
    if (chat.users.includes(userId)) {
        res.status(400);
        throw new Error("User is already in the group");
    }
  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $addToSet: { users: userId },
    },
    {new: true,}
  )
    .populate("users", "-password")
    .populate("group_admin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

//For removing user froma group
const remove_from_group = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("group_admin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});



module.exports = { access_chat,fetch_chats ,create_group, rename_group,add_to_group,remove_from_group};