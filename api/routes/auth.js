import express from "express";
import { register, login, setPassword, logout } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register)

router.put("/setpassword", setPassword)

router.post("/login", login)

router.post("/logout", logout)


export default router