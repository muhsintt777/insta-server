import * as dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { dbConnection } from "./configs/db";
const PORT = process.env.PORT;

async function startServer() {
  try {
    await dbConnection.authenticate();
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

startServer();
