import { supabase } from '../lib/supabase';

interface GeoInfoProps {
    ip: string,
    hostname: string,
    city: string,
    region: string,
    country: string,
    loc: string,
    org: string,
    postal: string,
    timezone: string,
    readme: string
}

export const DBService = {
    add: async (ipsearch: GeoInfoProps, userId: string) => {
        const { data: searchData, error: searchError } = await supabase
            .from('search_history')
            .insert([
                {
                    user_id: userId,
                    ip_address: ipsearch.ip,
                    is_self_lookup: false
                }
            ])
            .select('id');
        if (searchError) throw new Error(searchError.message);

        const id = searchData[0].id;

        const { error: geoInfoError } = await supabase
            .from('geo_info')
            .insert([
                {
                    search_id: id,
                    hostname: ipsearch.hostname,
                    city: ipsearch.city,
                    region: ipsearch.region,
                    country: ipsearch.country,
                    loc: ipsearch.loc,
                    org: ipsearch.org,
                    postal: ipsearch.postal,
                    timezone: ipsearch.timezone
                }
            ]);
        if (geoInfoError) throw new Error(geoInfoError.message);
    },

    delete: async (ipsearchIDs: string[], userId: string) => {
        const { error } = await supabase
            .from('search_history')
            .delete()
            .in('id', ipsearchIDs)
            .eq('user_id', userId); 

        if (error) throw new Error(error.message);
    },

    loadAll: async (userId: string) => {
        const { data, error } = await supabase
            .from('search_history')
            .select('id, ip_address, created_at')
            .eq('user_id', userId); 

        if (error) throw new Error(error.message);
        return data;
    },

    load: async (searchId: string, userId: string) => {
        const { data: ownerCheck } = await supabase
            .from('search_history')
            .select('id')
            .eq('id', searchId)
            .eq('user_id', userId) 
            .single();

        if (!ownerCheck) throw new Error('Unauthorized');

        const { data, error } = await supabase
            .from('geo_info')
            .select('*')
            .eq('search_id', searchId);

        if (error) throw new Error(error.message);
        return data;
    }
}