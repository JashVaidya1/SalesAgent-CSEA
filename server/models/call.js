import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please provide customer name']
  },
  callDateTime: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

const Call = mongoose.model('Call', callSchema);
export default Call;
