import express from "express";
import {
  handleEsewaSuccess,
  handleKhaltiCallback,
  payWithEsewa,
} from "../../controllers/payment/index.js";
import { forgotPassword, resetPassword, sendOtp, verifyOtp } from "../../controllers/users/index.js";

const router = express.Router();

router.post("/", payWithEsewa);
router.get("/khalti-callback", handleKhaltiCallback);
router.get("/esewa-success", handleEsewaSuccess);


export default router;
