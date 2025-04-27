import { sequelize } from "./sequelize.js";
import { settings } from "../settings.js";

export const syncSequelize = async () => {
  if (settings.env !== "development") return;

  // await sequelize.sync({ force: true });
};
