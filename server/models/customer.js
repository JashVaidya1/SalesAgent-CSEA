import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide customer name'],
  },

  contactNo: {
    type: String,
    required: [true, 'Please provide contact number'],
    unique: true
  },

  existingCustomer: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
