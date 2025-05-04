import Call from '../models/call.js';

export const createCall = async (req, res) => {
  try {
    const call = await Call.create(req.body);
    res.status(201).json(call);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllCalls = async (req, res) => {
  const calls = await Call.find();
  res.json(calls);
};
