const fs = require('fs');

const url = process.env.SUPABASE_URL || '';
const anonKey = process.env.SUPABASE_ANON_KEY || '';

const content = `window.SUPABASE_URL = ${JSON.stringify(url)};\nwindow.SUPABASE_ANON_KEY = ${JSON.stringify(anonKey)};\n`;

fs.writeFileSync('config.js', content);
console.log('config.js generated for Supabase runtime config');
