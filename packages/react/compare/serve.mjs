#!/usr/bin/env node
/* eslint-disable no-console */
// Minimal static server for the compare site.
// Serves packages/react/compare/ (index.html) and packages/react/compare/data/.
//
//   node serve.mjs          → http://localhost:4321
//   PORT=5000 node serve.mjs

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// __dirname of this file: packages/react/compare/
const COMPARE_DIR = path.dirname(fileURLToPath(import.meta.url));
// packages/react/compare/data/
const DATA_DIR = path.resolve(COMPARE_DIR, './data');

const PORT = +process.env.PORT || 4321;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json',
  '': 'image/png',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);

    let file;
    if (url === '/' || url === '/index.html') {
      file = path.join(COMPARE_DIR, 'index.html');
    } else if (url.startsWith('/compare-data/')) {
      // Strip the leading "/compare-data/" prefix and resolve under DATA_DIR.
      const rel = url.slice('/compare-data/'.length);
      file = path.resolve(DATA_DIR, rel);
      // Path traversal guard.
      if (!file.startsWith(DATA_DIR + path.sep) && file !== DATA_DIR) {
        res.writeHead(403).end();
        return;
      }
    } else {
      res.writeHead(404).end('Not found');
      return;
    }

    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(file).pipe(res);
    });
  })
  .listen(PORT, () =>
    console.log(`Carbon V12 Before & After → http://localhost:${PORT}`)
  );
