require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database")
const globalErrorHandler = require("./middleware/globalErrorHandler")
const config = require("./config/config");
const cors = require("cors")
const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = config.port;
connectDB();

//Middlefi
app.use(express.json());  //it parses incoming requests in json format
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173','https://restaurantfrontend-git-main-adnan-deusers-projects.vercel.app',"https://restaurantfrontend-gamma.vercel.app"]
}))

app.get("/", (req,res) =>{
    res.json({message : "Hello From the other Side😤"})
})

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/employee", require("./routes/employeeRoute"));
app.use("/api/menu", require("./routes/menuRoute"));

//Global Error
app.use(globalErrorHandler);

app.listen(PORT, () =>{
    console.log(`POS Server is listening on PORT ${PORT}`)
})
