const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    port: 8090,
    env: process.env.NODE_ENV || "unkown",
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD
};