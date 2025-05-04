import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const callSchema = new mongoose.Schema({
  callid: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
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
  },
  summary: {
    callid: {
      type: String,
      unique: true,
      default: uuidv4
    },
    contactno: {
      type: String,
      default: ''
    },
    datetime: {
      type: Date,
      default: Date.now
    },
    discount: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    product_name: {
      type: String,
      default: 'laptop'
    },
    sentiment_score: {
      type: Number,
      default: 0
    },
    shortDescription: {
      type: String,
      default: ''
    },
    sold: {
      type: Number,
      default: 0
    },
    soldPrice: {
      type: Number,
      default: 0
    },
    userid: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true,
});

const Call = mongoose.model('Call', callSchema);
export default Call;
