-- 1. Enable HTTP Extension (if not enabled)
CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

-- 2. Create Webhook Trigger for Bookings
CREATE OR REPLACE TRIGGER on_booking_insert
AFTER INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request(
  'https://oxkrnoekzrdqbexlmqsl.supabase.co/functions/v1/send-notification',
  'POST',
  '{"Content-Type":"application/json", "Authorization":"Bearer YOUR_ANON_KEY"}',
  '{}',
  '1000'
);

-- 3. Create Webhook Trigger for Enquiries
CREATE OR REPLACE TRIGGER on_enquiry_insert
AFTER INSERT ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request(
  'https://oxkrnoekzrdqbexlmqsl.supabase.co/functions/v1/send-notification',
  'POST',
  '{"Content-Type":"application/json", "Authorization":"Bearer YOUR_ANON_KEY"}',
  '{}',
  '1000'
);

-- NOTE: The above SQL is a simplified version.
-- In the Supabase Dashboard, it is often easier to use "Database Webhooks"
-- in the UI (Database -> Webhooks) which handles the payload structure automatically.