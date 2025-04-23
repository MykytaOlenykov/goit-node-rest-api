import { Contact } from "./contacts.js";
import { User } from "./users.js";

Contact.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
  onDelete: "CASCADE",
});

export { Contact, User };
