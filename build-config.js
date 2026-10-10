const fs = require('fs');
const path = require('path');

const envId = process.env.CLOUDBASE_ENV_ID || 'baby-bag-checklist-d2c763786b57f';
const region = process.env.CLOUDBASE_REGION || 'ap-shanghai';
const collection = process.env.CLOUDBASE_COLLECTION || 'checklist_items';

const configContent = `window.CLOUDBASE_ENV_ID = ${JSON.stringify(envId)};\nwindow.CLOUDBASE_REGION = ${JSON.stringify(region)};\nwindow.CLOUDBASE_COLLECTION = ${JSON.stringify(collection)};\n`;
fs.writeFileSync('config.js', configContent);

const bundledSdk = path.join('vendor', 'cloudbase.full.js');
if (!fs.existsSync(bundledSdk)) {
  throw new Error('缺少 vendor/cloudbase.full.js，请确认已推送完整仓库文件');
}

console.log('config.js generated; bundled CloudBase SDK is ready');
