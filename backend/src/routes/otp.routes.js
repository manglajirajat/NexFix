import Router from 'express';
import { generateOTP,generateOTPforPassChange,verifyOTP } from '../controller/otp.controller.js';

const router = Router();

router.post('/generate-otp',
    generateOTP
);

router.post('/generate-otp-for-pass-change',
    generateOTPforPassChange
);

router.post('/verify-otp',
    verifyOTP
);

export default router;