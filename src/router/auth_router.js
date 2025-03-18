const { Router } = require("express");
const { login } = require("../controller/auth_controller");
const { socialLoginValidation } = require("../validation/auth_validation");
const { bodyValidation } = require("../middleware/validation");

const router = Router();

router.post("/social-login", bodyValidation(socialLoginValidation), login);

module.exports = router;