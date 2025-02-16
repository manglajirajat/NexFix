import Router from 'express';
import { generateOTP,verifyOTP } from '../controller/otp.controller.js';

const router = Router();

router.post('/generate-otp',
    generateOTP
);

router.post('/verify-otp',
    verifyOTP
);

export default router;