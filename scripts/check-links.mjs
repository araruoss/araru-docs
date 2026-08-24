import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from './lib/content-validation.mjs';

const files = [];
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
  const file = path.join(directory, entry.name);
  if (entry.isDirectory()) walk(file);
  else if (/\.mdx?$/.test(entry.name)) files.push(file);
});
walk('src/content/docs');

const slugify = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');
const anchors = new Map(files.map((file) => {
  const source = fs.readFileSync(file, 'utf8');
  const title = parseFrontmatter(source)?.data.title;
  const values = new Set(['_top', ...(title ? [slugify(String(title))] : []), ...[...source.matchAll(/^#{2,6}\s+(.+)$/gm)].map((match) => slugify(match[1]))]);
  return [path.resolve(file), values];
}));
const failures = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  if (/^---\r?\n[\s\S]*?\r?\n---\r?\n\s*#\s+/.test(source)) failures.push(`${file}: H1 inicial duplica o título do Starlight`);
  for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1].trim().replace(/^<|>$/g, '');
    if (!href || /^(mailto:|tel:)/.test(href)) continue;
    if (/^https?:/.test(href)) {
      if (/github\.com\/araruoss/.test(href) && !/^https:\/\/github\.com\/araruoss(?:[/?#]|$)/.test(href)) failures.push(`${file}: URL Araru inválida ${href}`);
      continue;
    }
    const [rawPath, rawAnchor] = href.split('#');
    if (!rawPath) {
      if (rawAnchor && !anchors.get(path.resolve(file))?.has(decodeURIComponent(rawAnchor))) failures.push(`${file}: âncora inexistente #${rawAnchor}`);
      continue;
    }
    const clean = decodeURIComponent(rawPath);
    const bases = clean.startsWith('/') ? [path.resolve('src/content/docs', clean.slice(1))] : [path.resolve(path.dirname(file), clean), path.resolve(file.replace(/\.mdx?$/, ''), clean)];
    const candidates = bases.flatMap((resolved) => [
      resolved,
      `${resolved}.md`,
      `${resolved}.mdx`,
      `${resolved.replace(/readme$/i, 'README')}.md`,
      path.join(resolved, 'index.md'),
      path.join(resolved, 'index.mdx'),
    ]);
    const target = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    if (!target) failures.push(`${file}: link inexistente ${href}`);
    else if (rawAnchor && !anchors.get(target)?.has(decodeURIComponent(rawAnchor))) failures.push(`${file}: âncora inexistente ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`${files.length} documentos verificados: links e âncoras válidos.`);
