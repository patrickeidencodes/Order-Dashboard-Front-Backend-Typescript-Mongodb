// @ts-nocheck
import express from "express";
import Order from "../models/Order.js";
import { createError } from "../utils/error.js";
import { createOrder, deleteOrder, updateOrder, getOrder, getAllOrders, getAllIdOrders, getAllTypeOrders, getAllTypeCustomerOrders } from "../controllers/orderController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
//import { register, login } from "../controllers/auth.js";

const router = express.Router();

//CREATE
router.post("/", createOrder);
//UPDATE
router.put("/:id", updateOrder);
//DELETE
router.delete("/:id", verifyAdmin, deleteOrder);
//GET 
router.get("/find:id", verifyUser, getOrder);
//GET ALL
router.get("/", getAllOrders);
//GET ALL ID
router.get("/customer", getAllIdOrders);
//GET ALL WITH CERTAIN TYPE
router.get("/type/all", verifyUser, getAllTypeOrders);
//GET ALL WITH CERTAIN TYPE AND CERTAIN CUSTOMER
router.get("/type/customer", verifyUser, getAllTypeCustomerOrders);

export default router