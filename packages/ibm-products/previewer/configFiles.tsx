/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const packageJson: string = `{
  "name": "vite",
  "private": true,
  "version": "0.70.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@carbon/react": "latest",
    "@carbon/ibm-products": "latest",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-is": "^18.0.0"
  },
  "devDependencies": {
   "typescript": "^5.0.0",
    "@vitejs/plugin-react": "4.0.0",
    "sass": "^1.93.2",
    "vite": "^4.3.8"
  }
}`;

export const tsconfig: string = `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`;

export const index: string = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

`;

export const viteConfig: string = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;

export const main: string = `
import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

export const style: string = `
/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

@use '@carbon/styles/scss/config' with (
  $font-path: '@ibm/plex'
);
@use '@carbon/styles';
@use '@carbon/ibm-products/css/index';
`;
