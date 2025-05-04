// routes/summaryRoutes.js

import express from 'express';
import { getAllSummaries, createNewSummary, getSummaryByCallId, deleteAllSummaries } from '../controllers/summaryController.js';

const router = express.Router();

// Route to get all summaries
router.get('/getallsummary', getAllSummaries);

// Route to create a new summary
router.post('/create-new-summary', createNewSummary);

// Route to get a summary by call ID
router.get('/getsummarybycallid', getSummaryByCallId);

// Route to delete all summaries
router.delete('/delete-all', deleteAllSummaries);


export default router;
