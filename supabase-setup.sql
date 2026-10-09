-- Supabase SQL Editor 中执行
-- 作用：创建备产清单数据表，并开放匿名读写，供家庭成员通过公网链接共同编辑。

create table if not exists public.checklist_items (
  id text primary key,
  category text not null,
  name text not null,
  qty text default '',
  note text default '',
  done boolean default false,
  images jsonb default '[]'::jsonb,
  created_at_ms bigint not null,
  updated_at timestamptz default now()
);

alter table public.checklist_items enable row level security;

drop policy if exists "public read checklist" on public.checklist_items;
drop policy if exists "public insert checklist" on public.checklist_items;
drop policy if exists "public update checklist" on public.checklist_items;
drop policy if exists "public delete checklist" on public.checklist_items;

create policy "public read checklist"
  on public.checklist_items for select
  to anon
  using (true);

create policy "public insert checklist"
  on public.checklist_items for insert
  to anon
  with check (true);

create policy "public update checklist"
  on public.checklist_items for update
  to anon
  using (true)
  with check (true);

create policy "public delete checklist"
  on public.checklist_items for delete
  to anon
  using (true);
