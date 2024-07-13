// @ts-nocheck
import express from "express";
import { createUser, updateUser, deleteUser, getUser, getAllUsers } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkauthentification", verifyToken, (req, res, next) => {
    res.send("user is logged in")
})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("user is logged in and can delete their account")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("admin is logged in and can delete all accounts")
})
*/

//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET 
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/", verifyAdmin, getAllUsers);

export default router