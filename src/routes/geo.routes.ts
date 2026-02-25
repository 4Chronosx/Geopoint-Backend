import { Router } from "express";
import { getGeo, searchGeo } from "../controllers/geo.controller";

const router = Router();
router.get('/user', getGeo)
router.post('/search', searchGeo)


export default router;