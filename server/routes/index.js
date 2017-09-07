import express from 'express';
import account from './account';
import preference from './preference';

const router = express.Router();
router.use('/account', account);
router.use('/preference', preference);

export default router;