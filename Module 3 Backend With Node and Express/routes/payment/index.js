import express from "express";
import { payWithEsewa } from "../../controllers/payment/index.js";

const router = express.Router();

router.post("/", payWithEsewa);

export default router;
