# Formatos de leitura

## PDF

- descoberta: extensão `.pdf`;
- backend: `/conteudo` com HEAD/GET e Range para arquivo local;
- frontend: PDF.js legacy e worker empacotado pelo Vite como `.js`;
- páginas: canvas dimensionado à viewport; cache atual/vizinhas;
- capa: interna/provider ou primeira página via Poppler/pipeline;
- progresso: página, total e percentual;
- cleanup: cancela render tasks, limpa canvas/cache e destrói documento;
- limitação: PDFs corrompidos/protegidos podem falhar; fontes externas dependem da origem.

## EPUB

- descoberta: `.epub`;
- backend: entrega o arquivo, inclusive Range quando arquivo local;
- frontend: `epubParser.js` usa JSZip para container, OPF, spine e recursos; não usa a biblioteca `epubjs`;
- capa: metadata/manifest ou fallback gerado;
- progresso: unidade paginada/posição do conteúdo normalizado;
- cleanup: remove URLs/DOM temporários;
- limitação: EPUBs com recursos/DRM não padronizados podem não renderizar integralmente.

## MOBI

- descoberta: `.mobi`;
- backend: reader service/parser disponibiliza conteúdo, páginas e `/recursos/mobi/:recindex`;
- frontend: `mobiParser.js` normaliza payload e referências;
- capa: registro interno quando extraível, depois fallbacks;
- progresso: página/total;
- limitação: variantes proprietárias/DRM e MOBI malformado.

## CBZ

- descoberta: `.cbz`;
- backend: JSZip cria índice ordenado e serve `/paginas/:page`;
- frontend: `comicClient.js` busca imagens sob demanda e mantém Object URLs próximas;
- capa: primeira imagem;
- progresso: índice da imagem;
- cleanup: revoga Object URLs.

## CBR

- descoberta: `.cbr`;
- backend: UnRAR e fallback 7-Zip para índice/página;
- frontend: mesmo reader de comics;
- capa: primeira imagem;
- limitação: requer ferramentas/arquivo compatíveis; arquivos protegidos ou variantes RAR não suportadas falham.
