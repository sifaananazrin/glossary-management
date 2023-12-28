const Customer = require("../models/CustomerSchema");

exports.addCustomer = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    let customer = await Customer.findOne({ email });
    if (customer) {
      return res
        .status(400)
        .json({ error: "Customer with this email already exists." });
    }

    customer = await Customer.findOne({ phone });
    if (customer) {
      return res
        .status(400)
        .json({ error: "Customer with this phone number already exists." });
    }

    customer = new Customer({ name, phone, email });
    await customer.save();

    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer." });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the customers." });
  }
};
