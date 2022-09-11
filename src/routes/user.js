import { Router } from "express";
import { ROUTE_USER } from "../constants/routes.js";
import UserController from "../controllers/UserController.js";

const routerUser = new Router();
const userController = new UserController();

routerUser.post(ROUTE_USER, (req, res) => userController.loginUser(req, res));

export default routerUser;
