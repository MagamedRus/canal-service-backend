import { Router } from "express";
import { ROUTE_LOGIN } from "../constants/routes.js";
import UserController from "../controllers/UserController.js";

const routerUser = new Router();
const userController = new UserController();

routerUser.post(ROUTE_LOGIN, (req, res) => userController.loginUser(req, res));

export default routerUser;
