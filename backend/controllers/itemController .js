const Item = require("../models/ItemSchema");

exports.addItem = async (req, res) => {
  try {
    const { name, description, category, price, stock, stockUnit } = req.body;
    console.log(req.body);
    const existingItem = await Item.findOne({ name });
    if (existingItem) {
      return res
        .status(400)
        .json({ error: "Item with this item already exists." });
    }

    const newItem = new Item({
      name,
      description,
      category,
      price,
      stock,
      stockUnit,
    });
    await newItem.save();

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the item." });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({}).populate("category");
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the items." });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item." });
  }
};

exports.editItem = async (req, res) => {
  const { id } = req.params;
  const { name, stockUnit, ...otherUpdates } = req.body;
  console.log(req.body);

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    if (name) {
      const existingItem = await Item.findOne({ name, _id: { $ne: id } });
      if (existingItem) {
        return res
          .status(400)
          .json({ error: "Another item with this item already exists." });
      }
      item.name = name;
    }

    if (stockUnit) {
      item.stockUnit = stockUnit;
    }

    for (const [key, value] of Object.entries(otherUpdates)) {
      item[key] = value;
    }

    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the item." });
  }
};
