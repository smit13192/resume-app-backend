const { Router } = require("express");
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require("../controller/category_controller");
const { bodyValidation } = require("../middleware/validation");
const { createCategoryValidation } = require("../validation/category_validation");
const { ADMIN_ROLE } = require("../config/string");
const { verifyUser } = require("../middleware/verify_user");

const router = Router();

router.post("/", verifyUser([ADMIN_ROLE]), bodyValidation(createCategoryValidation), createCategory);
router.get("/", getAllCategory);
router.patch("/:id", verifyUser([ADMIN_ROLE]), bodyValidation(createCategoryValidation), updateCategory);
router.delete("/:id", verifyUser([ADMIN_ROLE]), deleteCategory);

module.exports = router;