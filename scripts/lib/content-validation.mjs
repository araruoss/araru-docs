export const allowedStatuses = ['stable', 'experimental', 'planned', 'deprecated'];

export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z][\w-]*):\s*(.*?)\s*$/);
    if (!field) continue;
    let value = field[2].replace(/^['"]|['"]$/g, '');
    if (field[1] === 'order' && /^-?\d+$/.test(value)) value = Number(value);
    data[field[1]] = value;
  }
  return { data, body: source.slice(match[0].length), raw: match[1] };
}

export function validateEditorialFrontmatter(source) {
  const parsed = parseFrontmatter(source);
  if (!parsed) return ['frontmatter ausente'];
  const { data } = parsed;
  const failures = [];
  if (typeof data.title !== 'string' || !data.title.trim()) failures.push('title ausente');
  if (typeof data.description !== 'string' || data.description.trim().length < 10) failures.push('description inválida');
  if (!Number.isInteger(data.order) || data.order < 0) failures.push('order deve ser inteiro não negativo');
  if (typeof data.section !== 'string' || !data.section.trim()) failures.push('section ausente');
  if (!allowedStatuses.includes(data.status)) failures.push(`status inválido: ${data.status ?? 'ausente'}`);
  return failures;
}
