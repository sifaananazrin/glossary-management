const { validationResult } = require('express-validator');
const Category = require('../models/CategorySchema');

exports.addcategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({error: 'Category already added.' });
    }

   
    const newCategory = new Category({
      name
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', survey: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the Category.' });
  }
};


exports.editCategory = async (req, res) => {
  const { id, newName } = req.body;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    category.name = newName;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the categories.' });
  }
};




exports.deleteCategory = async (req, res) => {
  const { id } = req.params; // assuming you're passing the category ID in the URL

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
};


