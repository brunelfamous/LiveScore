import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

export const connectDb = async () => {

    try {
        if (!MONGO_URL) {
            throw new Error('MONGO_URL is not defined in environment variables');
        };

        await mongoose.connect(MONGO_URL, { dbName: DB_NAME })
        console.log('conection établie avec succes');

    } catch (error) {
        console.error(error);
        process.exit(1)
    }

}