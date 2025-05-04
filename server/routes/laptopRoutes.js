import express from 'express';
import { createNewLaptop, getAllLaptops } from '../controllers/laptopController.js';

const router = express.Router();

router.post('/create-new-laptop', createNewLaptop);
router.get('/getalllaptops', getAllLaptops);

export default router;
