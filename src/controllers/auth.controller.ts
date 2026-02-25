

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const create = async(req: Request, res: Response) => {
    console.log('signup body', req.body);
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
    res.json(result);
}

export const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1]!;
    await AuthService.logout(token);
    res.status(204).send()
};