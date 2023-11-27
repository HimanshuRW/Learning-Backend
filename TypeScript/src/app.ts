import express from "express";
import bodyParser from "body-parser";
import router from "./router/route";
import path from "path";

const app = express();
const port = 3000;

const public_path : string = path.join(__dirname,"../public")!;

app.use(express.static(public_path));
app.use(bodyParser.json());
app.use(router);

app.listen(port,()=>{
    console.log(`listening to ${port}....`);
})