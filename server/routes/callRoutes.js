import express from 'express';
import { createNewCall, getCallById, getAllCalls, appendChatsToCall,createNewSummary, deleteAllCalls } from '../controllers/callController.js';

const router = express.Router();

router.post('/create-new-call', createNewCall); 
router.get('/', getCallById);
router.get('/getallcalls', getAllCalls);
router.post('/append-chats', appendChatsToCall); 
router.post('/create-new-summary', createNewSummary);
router.delete('/delete-all', deleteAllCalls); 

export default router;
