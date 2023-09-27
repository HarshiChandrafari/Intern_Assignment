// This model will contain the following
// Name of the user(username)
// password for his/her account
// their email id
// Age -  to restrict any kind of mentally disturbing content

const moongose = require('mongoose');
const bcrypt = require('bcryptjs');


const user_model = moongose.Schema(
    {
        name: { type: "String", required: true },
        email: { type: "String", unique: true, required: true },
        password: { type: "String", required: true },
        // Link to the picture
        pic: {
            type: "String",
            required: true,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        // age: {
        //     type: Number,
        //     validate: {
        //     validator: value => Number.isInteger(value) && value > 0,
        //     message: "Age must be a Positive Number"
        //      },
        //     required: true
        // }
    }, {timestamps: true}
)


user_model.methods.match_password = async function (entered_password) {
    return await bcrypt.compare(entered_password, this.password);
}
// before saving user we will encrypt the password
user_model.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const new_password = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, new_password);
})

const user = moongose.model("User", user_model);
module.exports = user;


