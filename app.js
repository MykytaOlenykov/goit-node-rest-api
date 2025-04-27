import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import { sequelize, verifySequelizeConnection } from "./db/sequelize.js";
import { syncSequelize } from "./db/utils.js";
import { settings } from "./settings.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

(async () => {
  try {
    await verifySequelizeConnection();
    await syncSequelize();

    const port = settings.port ?? 3000;
    app.listen(port);

    console.log(`Server is running. Use our API on port: ${port}`);
  } catch (error) {
    await sequelize.close();
    console.log(error);
    process.exit(1);
  }
})();
