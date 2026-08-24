import assert from 'node:assert/strict';
import { validateEditorialFrontmatter } from './lib/content-validation.mjs';

const valid = `---\ntitle: Example\ndescription: Valid documentation page.\norder: 1\nsection: test\nstatus: stable\n---\n`;
assert.deepEqual(validateEditorialFrontmatter(valid), []);
assert.match(validateEditorialFrontmatter(valid.replace('status: stable', 'status: unknown')).join(), /status inválido/);
assert.match(validateEditorialFrontmatter(valid.replace('order: 1', 'order: first')).join(), /order/);
assert.match(validateEditorialFrontmatter(valid.replace('title: Example\n', '')).join(), /title/);
assert.match(validateEditorialFrontmatter(valid.replace('description: Valid documentation page.\n', '')).join(), /description/);
console.log('5 casos de frontmatter executados com sucesso.');
