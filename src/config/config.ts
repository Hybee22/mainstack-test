import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? "";
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 5051;
const JWT_SECRET = process.env.JWT_SECRET ?? "";

export const config = {
  mongo: {
    url: MONGO_URI,
  },
  server: {
    port: SERVER_PORT,
  },
  jwt: {
    secret: JWT_SECRET,
  },
};
