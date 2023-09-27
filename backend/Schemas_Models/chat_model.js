// A single chat will contain the following data
        // Name of the chat
        // isGroup: bool variable to tell wether chat is a groupchat or not
        // users (2 in case of isGroup False)
        // Reference to the latest message in chat
        // If it's a group chat then information regarding group admin
 
const moongose = require('mongoose')

const chat_model = moongose.Schema(
    {
        // Inside this we will define our object
        chat_name: { type: String, trim: true },
        isGroup: { type: Boolean, default: false },
        users: [{
            // Reference it to a particular user
            type: moongose.Schema.Types.ObjectId,
            // A reference to the user model
            ref: "User",
        }],
        latest_message: {
            // This will store the latest message that we will display just below the name of user

            // Refernce it with object id
            type: moongose.Schema.Types.ObjectId,
             // A reference to the message model
            ref: "Message",
        },
        // If it is a group chat
        group_admin: {
             // Reference it to group admin ID
            type: moongose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    // To add timestam if a new chat is added
    {timestamps: true}
) 

const chat = moongose.model("Chat", chat_model);
module.exports = chat;