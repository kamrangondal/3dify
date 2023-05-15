const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  products: {
    type: [
      {
        type: String,
        required: true
      }
    ]
  },

  description: {
    type: String,
    required: true
  },

  developer: {
    type: String,
    default: 'Not Assigned',
  },

  status: {
    type: String,
    default: 'submitted',
  },

  comment: {
    type: String,
  },

  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file',
  },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
