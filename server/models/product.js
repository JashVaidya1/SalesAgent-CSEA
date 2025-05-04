import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  tags: { type: [String], default: [] },
  price: { type: Number, required: true },
  maximum_discount: { type: Number, default: 0 },
  no_of_available: { type: Number, default: 0 },
  category: { type: String }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product; 