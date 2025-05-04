import express from 'express';
import { createCustomer, getAllCustomers, deleteAllCustomers } from '../controllers/customerController.js';

const router = express.Router();

router.post('/new-customer', createCustomer);
router.get('/getallcustomers', getAllCustomers);
router.delete('/deleteallcustomers', deleteAllCustomers);

export default router;
