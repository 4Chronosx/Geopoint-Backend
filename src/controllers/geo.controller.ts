
import { Request, Response } from 'express';
import { GeoService } from '../services/geo.service';

export const getGeo = async(req: Request, res: Response) => {
    try {
        // get logged user ip works only in production
        // problem before: use of https://ipinfo.io//geo works on local 
        // but references the hosting platform during deployment
        // basically the ip address always is vercel's
        const ip = req.ip as string;
        const result = await GeoService.search(ip);
        res.json(result)
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}

export const searchGeo = async (req: Request, res: Response) => {
    const ip = req.query.ip as string;
    try {
        const result = await GeoService.search(ip);
        res.json(result);
    } catch (err: any) {
        res.status(500).json({error: err.message})
    }
}