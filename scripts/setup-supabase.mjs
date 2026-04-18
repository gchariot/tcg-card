import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
  .split(/\r?\n/)
  .reduce((acc, line) => {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) acc[m[1]] = m[2].trim();
    return acc;
  }, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

console.log('Creating bucket "reports"...');
const { data, error } = await supabase.storage.createBucket('reports', {
  public: true,
  fileSizeLimit: 10 * 1024 * 1024,
  allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
});

if (error) {
  if (error.message.includes('already exists')) {
    console.log('Bucket already exists — OK');
  } else {
    console.error('Error:', error);
    process.exit(1);
  }
} else {
  console.log('Bucket created:', data);
}
