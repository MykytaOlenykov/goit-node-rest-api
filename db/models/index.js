import { Contact } from "./contacts.js";
import { User } from "./users.js";

Contact.belongsTo(User, {
  foreignKey: "owner",
  onDelete: "CASCADE",
});

export { Contact, User };
