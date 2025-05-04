import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema(
  {
    callid: {
      type: String,
      required: true,
      unique: true
    },
    contactno: {
      type: String,
      required: true
    },
    datetime: {
      type: Date,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      required: true
    },
    product_name: {
      type: String,
      required: true
    },
    sentiment_score: {
      type: Number,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
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
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;
