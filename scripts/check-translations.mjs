import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter, validateEditorialFrontmatter } from './lib/content-validation.mjs';

const root = 'src/content/docs';
const canonicalRoot = path.join(root, 'docs');
const translatedRoot = path.join(root, 'pt-br/docs');
const list = (directory) => {
  const result = [];
  const walk = (current) => fs.readdirSync(current, { withFileTypes: true }).forEach((entry) => {
    const file = path.join(current, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.mdx?$/.test(entry.name)) result.push(path.relative(directory, file));
  });
  walk(directory);
  return result.sort();
};

const canonical = new Set(list(canonicalRoot));
const translated = new Set(list(translatedRoot));
const missing = [...canonical].filter((file) => !translated.has(file));
const orphaned = [...translated].filter((file) => !canonical.has(file));
const failures = orphaned.map((file) => `tradução sem fonte inglesa: ${file}`);

for (const file of [...canonical].filter((entry) => translated.has(entry))) {
  const source = fs.readFileSync(path.join(canonicalRoot, file), 'utf8');
  const translation = fs.readFileSync(path.join(translatedRoot, file), 'utf8');
  const invalid = validateEditorialFrontmatter(translation);
  failures.push(...invalid.map((error) => `${file}: ${error}`));
  const sourceData = parseFrontmatter(source)?.data;
  const translatedData = parseFrontmatter(translation)?.data;
  for (const key of ['order', 'section', 'status']) {
    if (sourceData?.[key] !== translatedData?.[key]) failures.push(`${file}: ${key} incompatível entre EN e PT-BR`);
  }
}

if (missing.length) {
  console.warn(`WARN: ${missing.length} tradução(ões) PT-BR ausente(s):\n${missing.map((file) => `  - ${file}`).join('\n')}`);
  if (process.argv.includes('--strict')) failures.push('traduções ausentes no modo estrito');
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`${canonical.size} slugs canônicos verificados; ${translated.size} traduções PT-BR válidas.`);
