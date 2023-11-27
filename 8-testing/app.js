require('dotenv').config();
console.log(process.env.S3_BUCKET);

const express = require('express');
const path = require('path');
const fs = require("fs");
const port = process.env.PORT || 3000;
const errorController = require("./controllers/error");

const bodyParser = require('body-parser');
const multer = require("multer");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

// deployment 
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");

// const csurf = require("tiny-csrf");

const mongoConnect = require("./util/databaseConnect");
const User = require("./models/users");

const store = new MongoDBStore({
    uri : process.env.MONGO_DB_URI,
    collection: "sessions",
});

// --- file storage for imgs ----
const fileStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});
const fileFilter = (req,file,cb) =>{
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        cb(null,true);
    } else cb(null,false);
}

// deployement ------
app.use(helmet()); // may be use this before body paerser , multer, routes 
app.use(compression()); //... after helmet middleware..
//... after helmet and compression....
//----- logging all stuff to file -----
const accessLogStream = fs.createWriteStream(
			path.join(__dirname,"access.log"),
			{flags : "a"}
);

app.use(morgan("combined",{stream : accessLogStream}));   // logs all stuff to access.log file

// ----- ejs -----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:store,
//   -- set httpOnly: false so that cookies can be accessed by client side js also --
//   httpOnly: false
}));
// const csrfProtection = csurf();
// app.use(csrfProtection);

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth');
const checkUser = require("./middlewares/checkUser");

app.use(authRouter);
app.use("/admin",checkUser,adminRouter);
app.use(shopRouter);
app.use("/", errorController.get404Page);

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Listening to port ${port}...`);
    })
})