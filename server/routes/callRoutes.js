import express from 'express';
import { createNewCall, getCallById, getAllCalls, appendChatsToCall } from '../controllers/callController.js';

const router = express.Router();

router.post('/create-new-call', createNewCall); 
router.get('/', getCallById);
router.get('/getallcalls', getAllCalls);
router.post('/append-chats', appendChatsToCall); 

export default router;
