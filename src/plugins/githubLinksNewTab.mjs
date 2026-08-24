export default function githubLinksNewTab() {
  return (tree) => {
    const visit = (node) => {
      if (node?.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && /^https:\/\/github\.com(?:\/|$)/.test(href)) {
          node.properties.target = '_blank';
          node.properties.rel = ['noopener', 'noreferrer'];
        }
      }
      node?.children?.forEach(visit);
    };
    visit(tree);
  };
}
