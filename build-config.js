const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const envId = process.env.CLOUDBASE_ENV_ID || 'baby-bag-checklist-d2c763786b57f';
const region = process.env.CLOUDBASE_REGION || 'ap-shanghai';
const collection = process.env.CLOUDBASE_COLLECTION || 'checklist_items';

const configContent = `window.CLOUDBASE_ENV_ID = ${JSON.stringify(envId)};\nwindow.CLOUDBASE_REGION = ${JSON.stringify(region)};\nwindow.CLOUDBASE_COLLECTION = ${JSON.stringify(collection)};\n`;
fs.writeFileSync('config.js', configContent);

fs.mkdirSync('vendor', { recursive: true });
const esbuildBin = path.join('node_modules', '.bin', process.platform === 'win32' ? 'esbuild.cmd' : 'esbuild');
const result = spawnSync(esbuildBin, [
  'cloudbase-entry.js',
  '--bundle',
  '--format=iife',
  '--target=es2018',
  '--outfile=vendor/cloudbase.full.js',
], { stdio: 'inherit' });

if (result.status !== 0) {
  process.exit(result.status || 1);
}

console.log('config.js and vendor/cloudbase.full.js generated for CloudBase');
