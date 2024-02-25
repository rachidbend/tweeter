import { createClient } from '@supabase/supabase-js';

const URL = 'https://yaaogiaydxorcvfwehkh.supabase.co';
const KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYW9naWF5ZHhvcmN2ZndlaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MDc1MDUsImV4cCI6MjAyNDE4MzUwNX0.MVwZdpiEk9HTfwdz12CLgkG6eG9dwVMfH9duNSPnx4w';

export const supabase = createClient(URL, KEY);
