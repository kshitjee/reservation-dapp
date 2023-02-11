import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import generalUserRoutes from "./routes/generalUserRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";

import dotenv from "dotenv";
const port = process.env.port || 5001;


const connectDB = async () => {

    const app = express();
    dotenv.config();

    app.use(bodyParser.json({limit: "30mb", extended: true}));
    app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

    app.use(cors());
    app.use('/api/generalusers', generalUserRoutes);
    app.use('/api/vendors', vendorRoutes);
    app.use('/api/auctions', auctionRoutes);


    mongoose.set('strictQuery', false);
    
    console.log("URL: " + port);
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(5001, ()=> console.log(`Server runnning on port: 5001`)))
    .catch((error)=> console.log(error.message));

};

export default connectDB;