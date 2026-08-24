import fs from 'node:fs';
import path from 'node:path';

const markdown = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.mdx?$/.test(entry.name)) markdown.push(full);
  }
}

for (const target of ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md']) {
  if (fs.existsSync(target)) markdown.push(target);
}
walk('src/content/docs');

const failures = [];
const links = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdown) {
  const source = fs.readFileSync(file, 'utf8');
  if (file.startsWith(`src${path.sep}content${path.sep}docs${path.sep}`) && /^---\r?\n[\s\S]*?\r?\n---\r?\n\s*#\s+/.test(source)) {
    failures.push(`${file}: título H1 inicial duplica o título renderizado pelo Starlight`);
  }
  for (const match of source.matchAll(links)) {
    const href = match[1].trim().replace(/^<|>$/g, '');
    if (!href || /^(https?:|mailto:|#)/.test(href)) continue;
    const clean = decodeURIComponent(href.split('#')[0]);
    const resolved = clean.startsWith('/')
      ? path.resolve('src/content/docs', clean.slice(1))
      : path.resolve(path.dirname(file), clean);
    const candidates = [resolved, `${resolved}.md`, `${resolved}.mdx`, path.join(resolved, 'index.md'), path.join(resolved, 'index.mdx')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) failures.push(`${file}: link inexistente ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`${markdown.length} documentos Markdown/MDX verificados: links relativos válidos.`);
