const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/addcustomer", customerController.addCustomer);
router.get("/getallcustomers", customerController.getAllCustomers);

module.exports = router;
