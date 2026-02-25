
import { Request, Response } from 'express';
import { GeoService } from '../services/geo.service';

export const getGeo = async(req: Request, res: Response) => {
    try {
        const result = await GeoService.getCurrent();
        res.json(result)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}

export const searchGeo = async (req: Request, res: Response) => {
    const { ip } = req.body;
    try {
        const result = await GeoService.search(ip);
        res.json(result);
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}