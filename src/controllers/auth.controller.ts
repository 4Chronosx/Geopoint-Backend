

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/middleware';

export const create = async(req: Request, res: Response) => {
    //console.log('signup body', req.body);
    const { email, password, username } = req.body; // accept username from client
    try {
        await AuthService.create(email, password, username);
        res.status(204).send();

    } catch (err: any) {
        console.error('signup error', err.message);
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 100
    });
    res.json({ user: result.user});
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.status(204).send()
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const result = await AuthService.getCurrentUser(req.token!);
        res.json({ user: result.user })
    } catch (err: any) {
        res.status(401).json({ message: 'Unauthorized' })
    } 
    
};
