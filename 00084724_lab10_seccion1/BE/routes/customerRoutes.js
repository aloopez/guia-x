import express from "express";
import customerController from "../controllers/customerController.js";

const customerRouter = express.Router();

customerRouter.get("/customers", customerController.getCustomers);
customerRouter.post("/sales", customerController.idExists);

export default customerRouter;