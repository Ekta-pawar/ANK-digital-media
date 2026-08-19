import express from "express";
import { login, logout, getMe } from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import { validateLogin } from "../validetors/auth.validetor.js";

const router = express.Router();

router.post("/login", validateLogin, login);

router.post("/logout", logout);

router.get("/me", protect, getMe);

export default router;
