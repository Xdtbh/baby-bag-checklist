const fs = require('fs');

const envId = process.env.CLOUDBASE_ENV_ID || 'baby-bag-checklist-d2c763786b57f';
const region = process.env.CLOUDBASE_REGION || 'ap-shanghai';
const collection = process.env.CLOUDBASE_COLLECTION || 'checklist_items';

const content = `window.CLOUDBASE_ENV_ID = ${JSON.stringify(envId)};\nwindow.CLOUDBASE_REGION = ${JSON.stringify(region)};\nwindow.CLOUDBASE_COLLECTION = ${JSON.stringify(collection)};\n`;

fs.writeFileSync('config.js', content);
console.log('config.js generated for CloudBase');
