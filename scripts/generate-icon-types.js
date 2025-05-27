// scripts/generate-icon-types.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/components/CustomIcon/icons');
const outputFile = path.join(__dirname, '../src/components/CustomIcon/icon-names.generated.ts');

const files = fs.readdirSync(iconsDir)
  .filter(f => f.endsWith('.svg'))
  .map(f => f.replace(/\.svg$/, ''));

const typeDef = `// This file is auto-generated. Do not edit manually.\nexport type IconName = ${files.map(f => `'${f}'`).join(' | ')};\nexport const availableIconNames = [${files.map(f => `'${f}'`).join(', ')}] as const;\n`;

fs.writeFileSync(outputFile, typeDef);
console.log(`Generated icon types for ${files.length} icons.`);
