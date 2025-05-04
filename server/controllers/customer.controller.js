import Customer from '../models/customer.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};
