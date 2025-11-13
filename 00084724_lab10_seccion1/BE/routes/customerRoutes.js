import express from "express";
import * as customerController from "../controllers/customerControllers.js";

const customerRouter = express.Router();

customerRouter.get("/customers", customerController.getCustomers);  
customerRouter.get("/customers/search", customerController.getCustomerByCode);

export default customerRouter;