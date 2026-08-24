import fs from 'node:fs';
import path from 'node:path';

const [section, name] = process.argv.slice(2);
if (!section || !name || !/^[a-z0-9-]+$/.test(section) || !/^[a-z0-9-]+$/.test(name)) {
  console.error('Uso: npm run docs:new -- <section> <slug>');
  process.exit(1);
}
const target = path.join('src/content/docs/docs', section, `${name}.md`);
if (fs.existsSync(target)) throw new Error(`Documento já existe: ${target}`);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, `---\ntitle: TODO\ndescription: TODO: describe this documentation page.\norder: 100\nsection: ${section}\nstatus: planned\n---\n`);
console.log(`Criado ${target}. Preencha o conteúdo e crie a tradução PT-BR correspondente.`);
