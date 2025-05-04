import Summary from '../models/summary.js';

export const getAllSummaries = async (req, res) => {
  try {
    const summaries = await Summary.find();
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summaries' });
  }
};

export const createNewSummary = async (req, res) => {
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

  try {
    const newSummary = new Summary({
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
    });

    await newSummary.save();
    res.status(201).json({ message: 'Summary created successfully', newSummary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create summary' });
  }
};

export const getSummaryByCallId = async (req, res) => {
  const { callid } = req.query;

  try {
    const summary = await Summary.findOne({ callid });
    if (!summary) {
      return res.status(404).json({ message: 'Summary not found' });
    }
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary by call ID' });
  }
};

// Controller function to delete all summaries
export const deleteAllSummaries = async (req, res) => {
  try {
    // Delete all summaries from the database
    await Summary.deleteMany();

    res.status(200).json({
      message: 'All summaries have been deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting all summaries:', error);
    res.status(500).json({
      message: 'Failed to delete all summaries.',
      error: error.message
    });
  }
};