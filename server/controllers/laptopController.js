import Laptop from '../models/laptop.js';

// CREATE NEW LAPTOP
export const createNewLaptop = async (req, res) => {
  try {
    const laptopData = req.body;

    const newLaptop = await Laptop.create(laptopData);

    res.status(201).json(newLaptop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL LAPTOPS
export const getAllLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.status(200).json(laptops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
