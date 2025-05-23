import path from "node:path";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve(".env") });

export const settings = {
  dbPassword: process.env.DB_PASSWORD,
  dbUsername: process.env.DB_USERNAME,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,

  env: process.env.NODE_ENV || "development",
  tokenSecret: process.env.TOKEN_SECRET,
};

const validateSettings = () => {
  for (const [key, value] of Object.entries(settings)) {
    if (value === undefined) {
      throw new Error(`.env doesn't have ${key}`);
    }
  }
};

validateSettings();
