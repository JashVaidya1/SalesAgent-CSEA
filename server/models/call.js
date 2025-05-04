import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const callSchema = new mongoose.Schema({
  callid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  contactno: {
    type: String,
    required: [true, 'Please provide contact number'],
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, 'Please provide customer name'],
  },
  product_name: {
    type: String,
    required: true,
    default: 'laptop',
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  last_call_summary: {
    type: String,
    default: '',
  },
  chats: {
    type: [{
      _id: false,
      role: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }],
    default: [] 
  }
}, {
  timestamps: true,
});

const Call = mongoose.model('Call', callSchema);
export default Call;
