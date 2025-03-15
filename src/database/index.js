const mongoose = require("mongoose");
const { DB_CONNECT } = require("../config/config");

async function databaseConnect() {
    try {
        await mongoose.connect(DB_CONNECT);
        console.log("Database connect successfully 😂😂");
        return true;
    } catch (error) {
        console.log("Error connecting to database", error);
        return false;
    }
};

module.exports = { databaseConnect };