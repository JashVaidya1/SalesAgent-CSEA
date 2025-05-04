import express from 'express';
import { createNewCall, getCallById } from '../controllers/callController.js';

const router = express.Router();

router.post('/create-new-call', createNewCall);

router.get('/', getCallById);

export default router;
