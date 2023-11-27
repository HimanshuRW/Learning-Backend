import express from "express";
const router = express.Router();
import {get_Todo_List,post_Todo_List} from "../controllers/control";
// router.get("/",get_Todo_List);
router.get("/note",get_Todo_List);
router.post("/note",post_Todo_List);

export default router;