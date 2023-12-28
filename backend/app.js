const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const categoryRouter = require("./routes/categoryRoutes");
const itemRouter = require("./routes/itemRoutes");
const customerRouter = require("./routes/customerRoutes");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
app.use(cors());
connectDB();

app.use(bodyParser.json());

app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/customer", customerRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
