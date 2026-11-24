import config from './config.js';
import mongoose from "mongoose";

mongoose.connect(config.MONGO_URI)

export default async function connectDB(){
    await mongoose.connect(config.MONGO_URI);

    console.log('connected to MongoDB');
}