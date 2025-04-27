import { DataTypes } from "sequelize";

import { sequelize } from "../sequelize.js";
import { userSubscriptions } from "../../constants/users.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: Object.values(userSubscriptions),
      defaultValue: userSubscriptions.starter,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    avatarURL: DataTypes.STRING,
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
