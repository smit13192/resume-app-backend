const { Router } = require("express");
const userRouter = require("./auth_router");
const categoryRouter = require("./category_router");

const router = Router();

router.use("/auth", userRouter);
router.use("/category", categoryRouter);

module.exports = router;