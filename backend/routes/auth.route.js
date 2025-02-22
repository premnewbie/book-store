import { Router } from "express";
import { getUser, login, logout, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/auth/user",protectRoute,getUser);

router.post("/auth/signup",signup);

router.post("/auth/login",login);

router.post("/auth/logout",logout);

export default router;