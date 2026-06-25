/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const packageJson: string = `{
  "name": "vite-lit",
  "private": true,
  "version": "0.70.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@carbon/ibm-products-web-components": "latest",
    "@carbon/web-components": "latest",
    "@carbon/styles": "latest",
    "lit": "^3.2.1"
  },
  "devDependencies": {
    "sass": "^1.64.1",
    "typescript": "^5.5.3",
    "vite": "^5.0.0"
  }
}`;

export const tsconfig: string = `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "moduleDetection": "force"
  },
  "include": ["src"]
}
`;

export const index: string = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Lit</title>
    <link rel="stylesheet" href="./src/index.css" />
    <script type="module" src="/src/main.ts"></script>
  </head>
  <body>
    <main>
      <my-app></my-app>
    </main>
  </body>
</html>
`;

export const viteConfig: string = `
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: []
});
`;

export const main: string = `
import './index.scss';
import './App';
`;

export const rootStyleImports: string = `
@use '@carbon/styles/scss/theme';
@use '@carbon/styles/scss/themes';
`;

export const rootStyleFooter: string = `
:root {
  @include theme.theme(themes.$white);
}
`;
