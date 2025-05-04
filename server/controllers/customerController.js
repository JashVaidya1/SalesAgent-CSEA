import Customer from '../models/customer.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer); // Send the created customer as a response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers); // Send all customers as a response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAllCustomers = async (req, res) => {
  try {
    await Customer.deleteMany();
    res.status(200).json({ message: 'All customers have been deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};