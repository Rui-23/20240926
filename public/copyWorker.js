import path from 'node:path';
import fs from 'node:fs';

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.mjs');
const cMapsDir = path.join(pdfjsDistPath, 'cmaps');

fs.cpSync(pdfWorkerPath, './dist/pdf.worker.mjs', { recursive: true });
fs.cpSync(cMapsDir, 'dist/cmaps/', { recursive: true });