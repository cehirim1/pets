import express from "express";
import { signup, signin } from "../controllers/user.js";


//define router - Router is inbuit with express routes
const router = express.Router();

//create routes/endpoints
router.post("/signup", signup);
router.post("/signin", signin);
/////

export default router;
