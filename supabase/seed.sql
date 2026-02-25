
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    role,
    aud
)
VALUES (
  '00000000-0000-0000-0000-000000000001', -- hardcoded UUID so you can reference it
  'admin@example.com',
  crypt('password123', gen_salt('bf')),
  now(), now(), now(),
  '{"username": "Admin"}'::jsonb,
  'authenticated',
  'authenticated'
);
