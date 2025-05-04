import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema({
  available: {
    type: Number,
    required: [true, 'Please specify if the laptop is available'],
  },
  battery_life_hours: {
    type: Number,
    required: [true, 'Please specify the battery life in hours'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide the laptop brand'],
  },
  graphics: {
    type: String,
    required: [true, 'Please specify the graphics card'],
  },
  id: {
    type: Number,
    required: [true, 'Please provide a unique laptop id'],
    unique: true,
  },
  model: {
    type: String,
    required: [true, 'Please provide the laptop model'],
  },
  price_inr: {
    type: Number,
    required: [true, 'Please specify the laptop price in INR'],
  },
  processor: {
    type: String,
    required: [true, 'Please specify the processor'],
  },
  ram_gb: {
    type: Number,
    required: [true, 'Please specify the RAM size in GB'],
  },
  recommended_for: {
    type: String,
    required: [true, 'Please specify the recommended use'],
  },
  screen_size_inches: {
    type: Number,
    required: [true, 'Please specify the screen size in inches'],
  },
  storage: {
    capacity_gb: {
      type: Number,
      required: [true, 'Please specify the storage capacity in GB'],
    },
    type: {
      type: String,
      required: [true, 'Please specify the type of storage (SSD/HDD)'],
    },
  },
}, {
  timestamps: true,
});

const Laptop = mongoose.model('Laptop', laptopSchema);
export default Laptop;
