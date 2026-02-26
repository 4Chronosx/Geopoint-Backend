import { Router } from "express";
import { getGeo, searchGeo } from "../controllers/geo.controller";
import { authenticate } from "../middleware/middleware";

const router = Router();
router.get('/user', authenticate, getGeo)
router.get('/search', authenticate, searchGeo)


export default router;