"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("./router/route"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const public_path = path_1.default.join(__dirname, "../public");
app.use(express_1.default.static(public_path));
app.use(body_parser_1.default.json());
app.use(route_1.default);
app.listen(port, () => {
    console.log(`listening to ${port}....`);
});
