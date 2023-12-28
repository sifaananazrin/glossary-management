const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.post("/addcategory", categoryController.addcategory);
router.put("/editcategory", categoryController.editCategory);
router.get("/getallcategories", categoryController.getAllCategories);
router.delete("/deletecategory/:id", categoryController.deleteCategory);

module.exports = router;
