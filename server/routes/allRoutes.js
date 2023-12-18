import { Router } from "express";
import {
  registerRoute,
  loginRoute,
  updateRoute,
  statusRoute,
} from "../controllers/routeController.js";

const router = Router();
router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.patch("/update", updateRoute);
router.get("/status/:id", statusRoute);

export const allRoutes = router;
