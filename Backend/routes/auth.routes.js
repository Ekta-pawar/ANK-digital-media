import express from "express";
import {
  login,
  logout,
  getMe,
  getAdmins,
  createAdmin,
  changePassword,
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import authRateLimiter from "../middleware/rateLimit.middleware.js";
import {
  validateLogin,
  validateRegister,
  validateChangePassword,
} from "../validetors/auth.validetor.js";

const router = express.Router();

router.post("/login", authRateLimiter, validateLogin, login);

router.post("/logout", logout);

router.get("/me", protect, getMe);

router.get("/admins", protect, getAdmins);

router.post("/admins", protect, validateRegister, createAdmin);

router.patch("/password", protect, validateChangePassword, changePassword);

export default router;
