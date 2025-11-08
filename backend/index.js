import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config({})

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
<<<<<<< HEAD
    origin : true,            //"http://localhost:5173"
=======
    origin : true,
>>>>>>> e304d6276cb9a497f90289613bf91e8293f0815f
    credentials : true
}
app.use(cors(corsOption));


app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

const port = process.env.port || 5000
app.listen(port, ()=>{
    connectDB();
    console.log(`server is listening at port ${port}`)
})
