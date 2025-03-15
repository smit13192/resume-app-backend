const { config } = require("dotenv");

config({
    path: '.env.development'
});

module.exports.PORT = process.env.PORT;
module.exports.DB_CONNECT = process.env.DB_CONNECT;