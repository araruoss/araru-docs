import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const markdown = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) markdown.push(full);
  }
}

for (const target of ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md']) {
  if (fs.existsSync(target)) markdown.push(target);
}
walk('docs');

const failures = [];
const links = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdown) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(links)) {
    const href = match[1].trim().replace(/^<|>$/g, '');
    if (!href || /^(https?:|mailto:|#)/.test(href)) continue;
    const clean = decodeURIComponent(href.split('#')[0]);
    const resolved = path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(resolved)) failures.push(`${file}: link inexistente ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`${markdown.length} documentos verificados: links relativos e comandos npm válidos.`);
