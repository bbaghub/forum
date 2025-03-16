// import mongoose from 'mongoose';

// let isConnected = false

// export const connectToBD = async () => {
//     mongoose.set('strictQuery', true);

//     if(!process.env.MONGODB_URL) return console.log('MONGODB_URL is not defined');
//     if(isConnected) return console.log('Already connected to MongoDB');

//     try{
//         await mongoose.connect(process.env.MONGODB_URL);

//         isConnected = true;
//         console.log('Connected to MongoDB');
//     }catch(error){
//         console.error('Error connecting to MongoDB', error);
//     }
// }

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL;

export const connectToBD = async () => {
    mongoose.set('strictQuery', true);

    if (!MONGODB_URI) {
        throw new Error("❌ MONGODB_URL is not defined in the environment variables");
    }

    if (mongoose.connection.readyState === 1) {
        console.log("✅ Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 20000, // Avoids indefinite waiting
            socketTimeoutMS: 45000, // Handles slow connections
        });

        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
