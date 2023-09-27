const jwt = require('jsonwebtoken');

const generate_token = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "50d",
    });
};

module.exports = generate_token;