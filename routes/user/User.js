import e from "express";

import {Router} from "express"
import { registerService,validateRegistration } from "../../services/services.js";


const router = e.Router();
router.post("/register", validateRegistration, registerService);
export default router