import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const initMongoose = () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    return mongoose.connect(process.env.MONGODB_URL)
};

export {
    initMongoose,
};