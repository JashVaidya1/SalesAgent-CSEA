import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true,
    index: true,
  },

  callId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Call',
    required: true
  },

  role: {
    type: String,
    required: [true, 'Please provide role!'],
  },

  parts: [
    {
      text: {
        type: String,
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
