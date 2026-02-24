
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE search_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ip_address TEXT NOT NULL,          
    is_self_lookup BOOLEAN DEFAULT false, 
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE geo_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
    hostname TEXT,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    loc TEXT NOT NULL,
    org TEXT NOT NULL,
    postal TEXT NOT NULL,
    timezone TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security 
ALTER TABLE search_history ENABLE ROW LEVEL Security

-- Add index for faster queries
CREATE INDEX on search_history(ip_address)


-- Trigger for auto-connecting Supabase Auth to Users

CREATE OR REPLACE FUNCTION public.handle_new_users()
RETURNS TRIGGER AS $$
BEGIN
    INSER INTO public.users (id, email, username, ip_address)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data ->> 'username'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


