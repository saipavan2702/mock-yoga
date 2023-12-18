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
router.put("/update/:id", updateRoute);
router.get("/status", statusRoute);

export const allRoutes = router;
