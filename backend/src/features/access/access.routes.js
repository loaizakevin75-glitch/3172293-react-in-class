import { Router } from "express";
import { accessController } from "./access.controller.js";

const router = Router();

router.get("/test/:userId", accessController.testPermission);

export default router;