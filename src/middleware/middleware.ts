
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

export interface AuthRequest extends Request {
    userId?: string;
    token?: string;
}

export const authenticate = async(req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({message: 'No token provided'});

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({message: 'Invalid or expired token'});

    req.userId = data.user.id;
    req.token = token;
    next();
}