import { insertContact } from "../model/contactModel.js";

export const createContact = async (data) => {
  return insertContact(data);
};
