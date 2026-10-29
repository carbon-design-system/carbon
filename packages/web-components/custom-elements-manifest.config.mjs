/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'node:path';
import carbonCemPlugin from './tasks/cem-plugin.mjs';

let checker;

export default {
  globs: ['src/**/*.ts'],
  exclude: [
    '**/*.d.ts',
    '**/*.stories.ts',
    '**/__tests__/**',
    '**/_story-assets/**',
    '**/stories/**',
    'src/components/file-uploader/demo-file-uploader.ts',
    'src/components/page-header-deprecated/**',
    'src/examples/**',
    'src/globals/internal/storybook-cdn.ts',
  ],
  outdir: '.',
  litelement: true,
  // The analyzer parses each file on its own. Parsing them as one program
  // instead gives the plugin a type checker to follow imports with.
  overrideModuleCreation({ ts, globs }) {
    const program = ts.createProgram(globs, {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      experimentalDecorators: true,
      skipLibCheck: true,
      noEmit: true,
      types: [],
    });
    checker = program.getTypeChecker();
    // a file first reached through an import is listed under its resolved path
    const sourceFiles = new Map(
      program
        .getSourceFiles()
        .map((sourceFile) => [path.resolve(sourceFile.fileName), sourceFile])
    );
    return globs.map((glob) => sourceFiles.get(path.resolve(glob)));
  },
  plugins: [carbonCemPlugin({ getChecker: () => checker })],
};
