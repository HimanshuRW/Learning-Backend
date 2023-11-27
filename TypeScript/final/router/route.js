"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const control_1 = require("../controllers/control");
// router.get("/",get_Todo_List);
router.get("/note", control_1.get_Todo_List);
router.post("/note", control_1.post_Todo_List);
exports.default = router;
