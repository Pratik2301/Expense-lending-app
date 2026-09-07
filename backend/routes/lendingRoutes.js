// routes/lendingRoutes.js
import { Router } from "express";
import {
  getAllLendings,
  createLending,
  updateLendingStatus,
  deleteLending,
} from "../controllers/lendingController.js";

const router = Router();

router.get("/", getAllLendings);            // GET    /api/lendings
router.post("/", createLending);            // POST   /api/lendings
router.patch("/:id/status", updateLendingStatus); // PATCH  /api/lendings/:id/status
router.delete("/:id", deleteLending);       // DELETE /api/lendings/:id

export default router;
