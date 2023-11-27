const express = require('express');
const path = require('path');
const port = 3000;
const errorController = require("./controllers/error");

const bodyParser = require('body-parser');
const multer = require("multer");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
// const csurf = require("tiny-csrf");

const mongoConnect = require("./util/databaseConnect");
const User = require("./models/users");

const MONGO_DB_URI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
// const MONGO_DB_URI = 'mongodb+srv://himanshuMongo:himpass@myfirstcluster.urmejyo.mongodb.net/shop';
const store = new MongoDBStore({
    uri : MONGO_DB_URI,
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

// app.use((req,res,next)=>{
//     User.findById("64ecfbeaf4a0447b51f6d8b3")
//         .then(user=>{
//             req.user = user;
//             next();
//         }).catch(err=>console.log(err));
// })
app.use(authRouter);
app.use("/admin",checkUser,adminRouter);
app.use(shopRouter);
app.use("/", errorController.get404Page);

mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Listening to port ${port}...`);
    })
})