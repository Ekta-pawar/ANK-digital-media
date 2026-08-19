import express from "express";
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/Contact.controller.js";
import protect from "../middleware/auth.middleware.js";
import {
  validateCreateContact,
  validateUpdateContact,
} from "../validetors/contact.validetor.js";

const router = express.Router();

router.post("/", validateCreateContact, createContact);

router.get("/", protect, getContacts);

router.get("/:id", protect, getContact);

router.patch("/:id", protect, validateUpdateContact, updateContact);

router.delete("/:id", protect, deleteContact);

export default router;
