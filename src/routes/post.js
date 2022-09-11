import { Router } from "express";
import { ROUTE_POST } from "../constants/routes.js";
import PostController from "../controllers/PostController.js";

const routerPost = new Router();
const postController = new PostController();

routerPost.get(ROUTE_POST, (req, res) => postController.getPosts(req, res));

export default routerPost;
