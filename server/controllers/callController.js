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
    } = req.body;

    const newCall = await Call.create({
      callid,
      contactno,
      datetime,
      name,
      product_name,
      userid,
      last_call_summary,
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
