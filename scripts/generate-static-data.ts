import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateStaticData() {
  console.log('Fetching data from Supabase...');

  const [
    peopleRes,
    buildingsRes,
    eventsRes,
    photographsRes,
    puckPagesRes,
  ] = await Promise.all([
    supabase.from('people').select('*'),
    supabase.from('buildings').select('*'),
    supabase.from('events').select('*'),
    supabase.from('photographs').select('*'),
    supabase.from('puck_pages').select('*').eq('published', true),
  ]);

  const data = {
    people: peopleRes.data || [],
    buildings: buildingsRes.data || [],
    events: eventsRes.data || [],
    photographs: photographsRes.data || [],
    puckPages: puckPagesRes.data || [],
    generatedAt: new Date().toISOString(),
  };

  const publicDir = join(process.cwd(), 'public');
  const dataDir = join(publicDir, 'data');

  mkdirSync(dataDir, { recursive: true });

  writeFileSync(
    join(dataDir, 'site-data.json'),
    JSON.stringify(data, null, 2)
  );

  for (const page of data.puckPages) {
    writeFileSync(
      join(dataDir, `page-${page.slug}.json`),
      JSON.stringify(page, null, 2)
    );
  }

  console.log('✓ Static data generated successfully!');
  console.log(`  - ${data.people.length} people`);
  console.log(`  - ${data.buildings.length} buildings`);
  console.log(`  - ${data.events.length} events`);
  console.log(`  - ${data.photographs.length} photographs`);
  console.log(`  - ${data.puckPages.length} pages`);
}

generateStaticData().catch((error) => {
  console.error('Error generating static data:', error);
  process.exit(1);
});
