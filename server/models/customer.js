import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide customer name'],
  },

  email: {
    type: String,
    required: [true, 'Please provide customer email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },

  last_call_summary: {
    type: String,
    required: [true, 'Please provide last call summary'],
  },

  contactno: {
    type: String,
    required: [true, 'Please provide contact number'],
 
  },

}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
