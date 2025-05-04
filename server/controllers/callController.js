import Call from '../models/call.js';

// CREATE NEW CALL
export const createNewCall = async (req, res) => {
  try {
    console.log("🔧 createNewCall initiated in backend");
    const {
      callid,
      contactno,
      datetime,
      name,
      product_name,
      userid,
      last_call_summary,
    } = req.body;

    const newCall = await Call.create({
      callid,
      contactno,
      datetime,
      name,
      product_name,
      userid,
      last_call_summary,
      summary: {}
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


// GET ALL CALLS
export const getAllCalls = async (req, res) => {
  try {
    const calls = await Call.find().sort({ createdAt: -1 }); // optional: latest first
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// APPEND MULTIPLE CHATS TO A CALL
export const appendChatsToCall = async (req, res) => {
  try {
    const { callid } = req.query;
    const { chats } = req.body;

    console.log("🔧 appendChatsToCall initiated");
    console.log("➡️ callid:", callid);
    console.log("📥 chats:", JSON.stringify(chats, null, 2));

    if (!callid) {
      console.error("❌ callid missing");
      return res.status(400).json({ error: 'callid is required in query' });
    }

    if (!Array.isArray(chats) || chats.length === 0) {
      console.error("❌ chats must be a non-empty array");
      return res.status(400).json({ error: 'chats must be a non-empty array' });
    }

    for (const [index, chat] of chats.entries()) {
      if (!chat.role || !chat.content) {
        console.error(`❌ Chat at index ${index} missing role/content:`, chat);
        return res.status(400).json({ error: 'Each chat must have role and content' });
      }
    }

    // Step 1: Find the call
    const existingCall = await Call.findOne({ callid });

    if (!existingCall) {
      console.warn("⚠️ No call found with callid:", callid);
      return res.status(404).json({ error: 'Call not found' });
    }

    // Step 2: Update chats array
    const updatedCall = await Call.findOneAndUpdate(
      { callid },
      { $push: { chats: { $each: chats } } },
      { new: true }
    );

    console.log("✅ Chats appended to call:", callid);
    res.status(200).json(updatedCall);

  } catch (error) {
    console.error("💥 Error in appendChatsToCall:", error.message);
    res.status(500).json({ error: error.message });
  }
};


export const createNewSummary = async (req, res) => {
  try {
    console.log('Received request to create new summary');
    console.log('Request body:', req.body);

    const {
      callid,
      contactno,
      datetime,
      discount,
      name,
      product_name,
      sentiment_score,
      shortDescription,
      sold,
      soldPrice,
      userid
    } = req.body;

    if (!callid) {
      console.warn('Missing callid in request');
      return res.status(400).json({ message: 'Missing callid in request' });
    }

    const call = await Call.findOne({ callid });

    if (!call) {
      console.warn(`Call with callid ${callid} not found`);
      return res.status(404).json({ message: 'Call not found' });
    }

    console.log(`Found call record for callid ${callid}, updating summary...`);

    call.summary = {
      callid,
      contactno,
      datetime,
      discount,
      name,
      product_name,
      sentiment_score,
      shortDescription,
      sold,
      soldPrice,
      userid
    };

    await call.save();
    console.log(`Summary updated and saved for callid ${callid}`);

    res.status(200).json({
      message: 'Summary updated successfully',
      summary: call.summary
    });
  } catch (error) {
    console.error('Error creating summary:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deleteAllCalls = async (req, res) => {
  try {
    await Call.deleteMany();

    res.status(200).json({
      message: 'All calls have been deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting all calls:', error);
    res.status(500).json({
      message: 'Failed to delete all calls.',
      error: error.message
    });
  }
};
