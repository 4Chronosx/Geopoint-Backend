import { Router } from "express";
import { addSearch, deleteSearches, getSearchHistory, getSearchInfo } from "../controllers/db.controller";
import { authenticate } from "../middleware/middleware";

const router = Router();
router.post('/add', authenticate, addSearch)
router.delete('/delete', authenticate, deleteSearches)
router.get('/get-all', authenticate, getSearchHistory)
router.get('/info', authenticate, getSearchInfo)

export default router;