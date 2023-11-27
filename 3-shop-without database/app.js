const express = require('express');
const path = require('path');
const errorController = require("./controllers/error");

const bodyParser = require('body-parser');
const app = express();

// ----- ejs -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop');
app.use("/admin", adminRouter);
app.use(shopRouter);
app.use("/",errorController.get404Page);
app.listen(3000);