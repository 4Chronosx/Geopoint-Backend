

import { supabase } from '../lib/supabase.js';

export const AuthService = {
    create: async(email: string, password: string, username?: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username: username ?? '' } }
        })
        if (error) {
            throw new Error(error.message)
        } 
    },

    login: async (email: string, password: string ) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            throw new Error(error.message)
        }

        return {
            access_token: data.session.access_token,
            user: data.user
        };
    },

    logout: async (token: string) => {
        const { error } = await supabase.auth.admin.signOut(token);
        if (error) throw new Error(error.message)
    }
}