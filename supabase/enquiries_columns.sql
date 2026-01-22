ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS service text,
  ADD COLUMN IF NOT EXISTS whatsapp_opt_in boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS meeting_options boolean DEFAULT false;
