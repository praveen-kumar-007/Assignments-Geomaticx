import { createContact } from "../services/contactService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const submitContact = async (req, res) => {
  try {
    const contact = await createContact(req.body);
    return successResponse(res, 201, "Contact message received", contact);
  } catch (err) {
    return errorResponse(res, 500, err.message || "Server error");
  }
};
