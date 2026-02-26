import { DBService } from "../services/db.service"
import { Response } from 'express';
import { AuthRequest } from '../middleware/middleware';


export const addSearch = async (req: AuthRequest, res: Response) => {
    const search = req.body;
    const userId = req.userId!;
    
    try {
        await DBService.add(search, userId);
        res.status(204).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteSearches = async (req: AuthRequest, res: Response) => {
    const { searches } = req.body;
    try {
        await DBService.delete(searches, req.userId!); 
        res.status(204).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getSearchHistory = async (req: AuthRequest, res: Response) => {
    try {
        const result = await DBService.loadAll(req.userId!); 
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

export const getSearchInfo = async (req: AuthRequest, res: Response) => {
    const searchId = req.query.search_id as string;
    try {
        const result = await DBService.load(searchId, req.userId!); 
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}