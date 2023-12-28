const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  stockUnit: {
    type: String,
    required: true,
    enum: ['kg', 'count'] 
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
