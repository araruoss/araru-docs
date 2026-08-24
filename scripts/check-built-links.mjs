import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const configuredBase = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`;
const basePath = configuredBase === '/' ? '' : configuredBase;
const htmlFiles = [];
const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
  const file = path.join(directory, entry.name);
  if (entry.isDirectory()) walk(file);
  else if (entry.name.endsWith('.html')) htmlFiles.push(file);
});
walk(root);

const routeFor = (file) => {
  const relative = path.relative(root, file).split(path.sep).join('/');
  return relative.endsWith('/index.html') ? `/${relative.slice(0, -10)}` : `/${relative}`;
};
const withoutBase = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  if (!basePath) return decoded;
  if (decoded === basePath) return '/';
  return decoded.startsWith(`${basePath}/`) ? decoded.slice(basePath.length) : decoded;
};
const targetFor = (pathname) => {
  const relative = withoutBase(pathname).replace(/^\/+/, '');
  const direct = path.join(root, relative);
  const candidates = [direct, path.join(direct, 'index.html'), `${direct}.html`];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
};
const ids = new Map(htmlFiles.map((file) => [file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]))]));
const failures = new Set();

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const route = routeFor(file);
  for (const match of source.matchAll(/\shref="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href || /^(https?:|mailto:|tel:|javascript:|data:)/.test(href)) continue;
    const destination = new URL(href, `https://docs.local${route}`);
    const target = targetFor(destination.pathname);
    if (!target) {
      failures.add(`${route}: rota inexistente ${href} → ${destination.pathname}`);
      continue;
    }
    if (destination.hash && target.endsWith('.html')) {
      const anchor = decodeURIComponent(destination.hash.slice(1));
      if (anchor && !ids.get(target)?.has(anchor)) failures.add(`${route}: âncora inexistente ${href}`);
    }
  }
}

if (failures.size) {
  console.error([...failures].join('\n'));
  process.exit(1);
}
console.log(`${htmlFiles.length} páginas estáticas verificadas: rotas e âncoras publicadas válidas.`);
