-- Create the registrations table
CREATE TABLE public.registrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add an index on email for faster lookups
CREATE INDEX idx_registrations_email ON public.registrations(email);

-- Add an index on created_at for faster sorting
CREATE INDEX idx_registrations_created_at ON public.registrations(created_at);

-- Add a comment to the table
COMMENT ON TABLE public.registrations IS 'Stores user registrations from the SkillZChain join form';
