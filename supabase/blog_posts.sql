-- Blog posts table for Cartattac / KAMI
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- Accessed exclusively server-side via the service key (supabaseAdmin), like the `reports` table.

create table if not exists public.blog_posts (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  author_email      text not null,
  author_name       text,
  locale            text not null default 'fr',
  slug              text not null,
  title             text not null,
  excerpt           text,
  content           text,               -- HTML produced by the TipTap editor
  cover_image_url   text,
  category          text,
  status            text not null default 'draft',   -- 'draft' | 'published'
  published_at      timestamptz,
  reading_time      int not null default 0,          -- minutes
  meta_title        text,
  meta_description  text,
  og_image_url      text,
  constraint blog_posts_slug_locale_unique unique (locale, slug)
);

-- Fast lookups for the public listing (published, most recent first)
create index if not exists blog_posts_public_idx
  on public.blog_posts (locale, status, published_at desc);

-- Keep updated_at fresh on every update
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();
