// @ts-check

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * @param {string} filePath
 * @returns {string}
 */
const normalizePath = (filePath) => filePath.split(sep).join('/');

/**
 * @param {string} rawLine
 * @returns {{ line: string, negated: boolean } | null}
 */
const normalizeGitignoreLine = (rawLine) => {
  const trimmedLine = rawLine.trim();
  if (!trimmedLine || trimmedLine.startsWith('#')) return null;

  let line = trimmedLine;
  const negated = line.startsWith('!');

  if (line.startsWith('\\#') || line.startsWith('\\!')) {
    line = line.slice(1);
  }

  if (negated) {
    line = line.slice(1);
  }

  return { line, negated };
};

/**
 * @param {string} rootDir
 * @returns {string[]}
 */
const findGitignoreFiles = (rootDir) => {
  const gitignoreFiles = [];
  const pendingDirs = [rootDir];

  // Traverse the repo tree, skipping directories that shouldn't affect ignore
  // rules.
  while (pendingDirs.length) {
    const currentDir = pendingDirs.pop();

    if (!currentDir) break;

    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === '.gitignore') {
        gitignoreFiles.push(join(currentDir, entry.name));
        continue;
      }

      if (!entry.isDirectory() || entry.isSymbolicLink()) {
        continue;
      }

      if (entry.name === '.git' || entry.name === 'node_modules') {
        continue;
      }

      pendingDirs.push(join(currentDir, entry.name));
    }
  }

  return gitignoreFiles;
};

/**
 * @param {string} gitignoreFile
 * @param {string} repoRoot
 */
const parseNestedGitignore = (gitignoreFile, repoRoot) => {
  const dirRelative = relative(repoRoot, dirname(gitignoreFile));
  if (!dirRelative) return [];

  const dirPrefix = normalizePath(dirRelative);
  const rawLines = readFileSync(gitignoreFile, 'utf8').split(/\r?\n/);
  const patterns = [];

  for (const rawLine of rawLines) {
    const normalized = normalizeGitignoreLine(rawLine);

    if (!normalized) continue;

    let { line } = normalized;
    const { negated } = normalized;

    const isAnchored = line.startsWith('/');
    if (isAnchored) {
      line = line.slice(1);
    }

    const hasSlash = line.includes('/');
    const isDir = line.endsWith('/');
    const patternBase = hasSlash
      ? posix.join(dirPrefix, line)
      : posix.join(dirPrefix, '**', line);
    const pattern = isDir ? `${patternBase}**` : patternBase;

    patterns.push(negated ? `!${pattern}` : pattern);
  }

  return patterns;
};

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const gitignorePaths = findGitignoreFiles(repoRoot).sort(
  (a, b) => a.length - b.length
);
const rootGitignore = join(repoRoot, '.gitignore');
const nestedGitignorePatterns = gitignorePaths
  .filter((gitignoreFile) => gitignoreFile !== rootGitignore)
  .flatMap((gitignoreFile) => parseNestedGitignore(gitignoreFile, repoRoot));

// TODO: There is an `eslintConfig` reference in `package.json`. Investigate
// whether it should be moved to this file or deleted.
// https://github.com/carbon-design-system/carbon/issues/18991

export default defineConfig(
  includeIgnoreFile(rootGitignore),
  {
    name: 'Imported nested .gitignore patterns',
    ignores: nestedGitignorePatterns,
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      // All of these rules have directives in the codebase that disable them,
      // which implies that they were set previously.
      'no-console': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'require-atomic-updates': 'error',
    },
  },
  {
    files: [
      '**/tasks/**',
      'actions/**',
      'packages/cli/**',
      'packages/upgrade/**',
    ],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
      react: react,
      'react-hooks': reactHooks,
      jsdoc: jsdoc,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // ...jsdoc.configs['flat/recommended'].rules, // Too noisy at the moment. Uncomment it to enable it.
    },
  },
  {
    files: [
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    plugins: {
      'testing-library': testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
  {
    files: ['packages/react/code-connect/**/*.figma.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': false }],
      'react/jsx-no-undef': 'off',
    },
  },
  {
    ignores: [
      // Build folders
      '**/types/',

      'packages/*/examples/*',

      // Components
      'packages/components/demo/*.css',
      'packages/components/demo/*.map',
      'packages/components/demo/*.js',
      'packages/components/demo/js/prism.js',
      'packages/components/demo/hot',
      '!packages/components/demo/index.js', // This negation might need manual handling
      'packages/components/tests/a11y-results',
      'packages/components/scripts',
      'packages/components/scss',
      'packages/components/html',
      'packages/components/docs/js',
      'packages/components/scss/globals/vendor/**',
      'packages/components/src/globals/scss/vendor/**',

      // Upgrade
      '**/__testfixtures__/**',
      'packages/upgrade/fixtures/sample-project/example-imports-to-unified-package.js',

      // React
      '**/storybook-static/**',

      // Icons React

      // Templates
      'packages/cli/src/component/templates/**',

      // Generated files.
      '**/generated/',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/18991
      // Tests.
      '**/*-test.js',
      '**/__tests__/**/*',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/18991
      // Stories.
      '**/.storybook/**/*',
      '**/*.stories.js',
      '**/stories/**/*',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/19012
      'packages/react/src/components/Notification/a11yIconWarningSolid.js',
      'packages/react/src/components/OverflowMenuV2/index.js',
      'packages/react/src/components/Pagination/experimental/PageSelector.js',
      'packages/react/src/components/Pagination/experimental/Pagination-story.js',
      'packages/react/src/components/Pagination/experimental/Pagination.js',
      'packages/react/src/components/Switch/IconSwitch.js',

      // TODO: Delete these ignores.
      // https://github.com/carbon-design-system/carbon/issues/19012
      'www/src/components/Flex/index.js',
      'www/src/components/Header/index.js',
      'www/src/components/Text/index.js',
      'www/src/components/WorkspaceList/index.js',
      'www/src/pages/_app.js',
      'www/src/pages/index.js',
      'www/src/pages/insights/\\[owner\\]/\\[repo\\].js',
      'www/src/pages/insights/index.js',
      'www/src/pages/packages/\\[package\\]/index.js',
      'www/src/pages/packages/index.js',
    ],
  }
);
