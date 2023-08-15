require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const testRoutes = require("./routes/test");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// DB Connection
const app = express();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err, "ERR OCCURED");
  });

//Common Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use("/api", authRoutes);

app.use("/api", userRoutes);

app.use("/api", testRoutes);

app.use("/api" , categoryRoutes);

app.use("/api" , productRoutes);



// Port
const port = process.env.PORT;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
