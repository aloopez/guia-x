import express from "express";
import * as salesController from "../controllers/salesControllers.js";

const salesRouter = express.Router();

salesRouter.post("/sales", salesController.postSales);
salesRouter.get("/sales", salesController.getSalesWithCustomerName)
salesRouter.get("/sales/report", salesController.getSalesReport);

export default salesRouter;