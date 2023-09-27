// importing express
const express = require('express');
const dotenv = require('dotenv');
const connect_to_databse = require('./Config/data_base');
const userRoutes = require('./Routes/User_routes.js')
const chatRoutes = require('./Routes/Chat_routes.js')
const { not_found, error_handler } = require("./Middleware/error_middleware.js");
const cors = require('cors'); // Import the cors package
// creating an instance of express 
const app = express();

//Accepting json data
app.use(express.json());
app.use(cors());

dotenv.config();
connect_to_databse();

app.get('/', (request, response) => {
    response.send("API running");
});

// Endpoint for user
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)


// error handling middlewares
app.use(not_found);
app.use(error_handler);

const port = process.env.Port || 5000;
app.listen(5000, () => { console.log('Server Started on PORT 5000'); });

