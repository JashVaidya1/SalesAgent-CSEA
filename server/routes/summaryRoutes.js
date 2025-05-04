// routes/summaryRoutes.js

import express from 'express';
import { getAllSummaries, createNewSummary, getSummaryByCallId, deleteAllSummaries } from '../controllers/summaryController.js';

const router = express.Router();

router.get('/getallsummary', getAllSummaries);

router.post('/create-new-summary', createNewSummary);

router.get('/getsummarybycallid', getSummaryByCallId);

router.delete('/delete-all', deleteAllSummaries);

export default router;
