import Call from '../models/call.js';

// CREATE NEW CALL
export const createNewCall = async (req, res) => {
  try {
    const {
      callid,
      contactno,
      datetime,
      name,
      product_name,
      userid,
      last_call_summary,
      laptop_data
    } = req.body;

    const newCall = await Call.create({
      callid,
      contactno,
      datetime,
      name,
      product_name,
      userid,
      last_call_summary,
      laptop_data
    });

    res.status(201).json(newCall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET CALL DETAILS BY CALLID
export const getCallById = async (req, res) => {
  try {
  
    const { callid } = req.query;

    console.log(callid);

    const call = await Call.findOne({ callid });

    if (!call) {
      return res.status(404).json({ error: 'Call not found' });
    }

    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
