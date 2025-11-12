import express from "express";
import * as userController from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signIn", userController.signIn);
userRouter.get("/users", userController.getUsers);
userRouter.get("/users/:id", userController.getUserById);
userRouter.post("/users", userController.createUser);
userRouter.put("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);

export default userRouter;