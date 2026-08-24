import fs from 'node:fs';
import path from 'node:path';
import { validateEditorialFrontmatter } from './lib/content-validation.mjs';

const files = [];
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
  const file = path.join(directory, entry.name);
  if (entry.isDirectory()) walk(file);
  else if (/\.mdx?$/.test(entry.name)) files.push(file);
});
walk('src/content/docs');

const failures = files.flatMap((file) => validateEditorialFrontmatter(fs.readFileSync(file, 'utf8')).map((error) => `${file}: ${error}`));
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`${files.length} documentos com frontmatter editorial válido.`);
