import mongoose from "mongoose";
import ENV from "./env";

export default async function connectMongo() {
    try {
        await mongoose.connect(ENV.MONGO_URL);
        console.log('Base de datos conectada.');
    } catch (error) {
        console.log(error);
    }
}