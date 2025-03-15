const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { PORT } = require("./config/config");
const { databaseConnect } = require("./database");
const { getLocalIP } = require("./utils/utils");
const router = require("./router");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/v1', router);

databaseConnect().then((status) => {
    if (!status) return;
    app.listen(PORT, () => {
        console.log(`Server start on PORT ${PORT} 🚀🚀`);
        console.log(`Server Link: http://${getLocalIP()}:${PORT}/`);
    });
})