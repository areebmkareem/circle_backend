import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: 'src/config/environment/.env' })

const DB_URI = process.env.DB_URI_PROD || "mongodb://localhost:27017/circle-app"
console.log(DB_URI);

function DatabaseConnection() {
    mongoose.connect(DB_URI, { useNewUrlParser: true });

}
export default DatabaseConnection