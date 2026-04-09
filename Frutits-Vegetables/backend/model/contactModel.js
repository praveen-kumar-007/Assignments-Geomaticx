import db from "../config/db.js";

export const insertContact = async ({ Name, Phone, Email, Message }) => {
  const sql = `INSERT INTO contacts (Name, Phone, Email, Message) VALUES (?, ?, ?, ?)`;
  const [result] = await db.execute(sql, [Name, Phone, Email, Message]);

  return {
    id: result.insertId,
    Name,
    Phone,
    Email,
    Message,
    createdAt: new Date().toISOString(),
  };
};
