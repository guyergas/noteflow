// Turns the single-file build into an artifact page body (the host adds doctype/html/head/body).
import { readFileSync, writeFileSync } from 'node:fs';
const html = readFileSync('dist-preview/index.html', 'utf8');
const head = /<head>([\s\S]*?)<\/head>/.exec(html)[1];
const body = /<body>([\s\S]*?)<\/body>/.exec(html)[1];
const keep = head
  .replace(/<meta charset[^>]*>/, '')
  .replace(/<meta name="viewport"[^>]*>/, '')
  .replace(/<link rel="(icon|apple-touch-icon|manifest)"[^>]*>/g, '');
const title = /<title>[\s\S]*?<\/title>/.exec(keep)[0];
writeFileSync('dist-preview/noteflow.html', `${title}\n${keep.replace(title, '')}\n${body}`);
console.log('artifact page', (readFileSync('dist-preview/noteflow.html').length / 1e6).toFixed(2), 'MB');
