const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { PORT } = require("./config/config");
const { databaseConnect } = require("./database");
const { getLocalIP } = require("./utils/utils");
const router = require("./router");
const { errorMiddleware } = require("./middleware/error");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public",express.static("./public"));
app.use(morgan("dev"));
app.use("/api/v1", router);
app.use(errorMiddleware);

databaseConnect().then((status) => {
    if (!status) return;
    app.listen(PORT, () => {
        console.log(`Server start on PORT ${PORT} 🚀🚀`);
        console.log(`Server Link: http://${getLocalIP()}:${PORT}/`);
    });
})