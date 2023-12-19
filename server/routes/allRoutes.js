import { Router } from "express";
import {
  registerRoute,
  loginRoute,
  updateRoute,
  statusRoute,
  batchRoute,
} from "../controllers/routeController.js";

const router = Router();
router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.patch("/update", updateRoute);
router.get("/status/:id", statusRoute);
router.patch("/batch/:id", batchRoute);

export const allRoutes = router;
