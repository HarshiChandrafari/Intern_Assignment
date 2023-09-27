// This message model contains three things
        // Information about the sender
        // Content of the message
        // The chat this message belongs

const moongose = require('mongoose');

const message_model = moongose.Schema({
    // here we will build the object
    sender: {
        type: moongose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: { type: String, trim: true },
    chat: {
        type: moongose.Schema.Types.ObjectId,
        ref: "Chat",
    }
},
{ timestamps: true,})

const message = moongose.model("Message", message_model);
module.exports = message;