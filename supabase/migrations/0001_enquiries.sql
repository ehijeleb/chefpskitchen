-- Chef P's Kitchen — enquiries table
-- Run in the Supabase SQL editor, or via `supabase db push` with the CLI.

create table if not exists public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  phone        text,
  event_type   text not null,
  event_date   date,
  guest_count  integer,
  location     text,
  message      text not null,
  status       text not null default 'new',   -- new | contacted | quoted | booked | closed
  source       text default 'website'
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Row Level Security ON, with NO public policies.
-- The anon/publishable client therefore cannot SELECT/INSERT/UPDATE/DELETE.
-- The website writes only through the server route handler using the
-- service-role key, which bypasses RLS. Read enquiries from the Supabase
-- dashboard or a server-side admin tool — never from the browser.
alter table public.enquiries enable row level security;

-- (Intentionally no `create policy` statements for anon/authenticated.)

comment on table public.enquiries is
  'Catering enquiries submitted from the public website. Write-only from the server (service role); RLS blocks all public access.';
