import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

export default { PORT, MONGODB_URL };
