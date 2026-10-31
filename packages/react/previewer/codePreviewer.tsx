/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StackBlitzSDK, { Project } from '@stackblitz/sdk';
import {
  index,
  main,
  packageJson,
  style,
  viteConfig,
  flexGridScss,
  tsconfig,
} from './configFiles';
import * as carbonComponents from '../src/index';
import * as carbonIconsReact from '@carbon/icons-react';
import {
  FlexGridScss,
  GridScss,
  LayerScss,
  ThemeScss,
} from './storybookStyles';
import * as prettier from 'prettier/standalone';
import * as tsParser from 'prettier/plugins/typescript';
import * as estreeParser from 'prettier/plugins/estree';

// Inline prettier-config-carbon values to avoid CJS require() in browser context
const prettierConfig = {
  bracketSameLine: true,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5' as const,
  proseWrap: 'always' as const,
};

type StoryWithSourceCode = {
  parameters: {
    docs: {
      source: {
        originalSource: string;
      };
    };
  };
  args?: Record<string, unknown>;
};

interface PreviewerOptions {
  story: StoryWithSourceCode;
  args?: Record<string, unknown>;
  customImports?: string[];
  customFunctionDefs?: string[];
  styles?: string;
  title?: string;
  additionalFiles?: Record<string, string>;
}

// Registry of story scss strings we can inject
const storyScssRegistry: Record<string, { content: string }> = {
  FlexGrid: { content: FlexGridScss },
  Grid: { content: GridScss },
  Layer: { content: LayerScss },
  Theme: { content: ThemeScss },
};

// Backward-compatible overload:
// Legacy: stackblitzPrefillConfig(storyObject)
// New:    stackblitzPrefillConfig({ story, customImports, styles, title, ... })
export const stackblitzPrefillConfig = (
  optionsOrStory: PreviewerOptions | StoryWithSourceCode,
  legacyCustomImport?: string
) => {
  // Detect legacy call: first arg is a story object (has .parameters.docs)
  if ('parameters' in optionsOrStory) {
    return _stackblitzPrefillConfig({
      story: optionsOrStory as StoryWithSourceCode,
      customImports: legacyCustomImport ? [legacyCustomImport] : [],
    });
  }
  return _stackblitzPrefillConfig(optionsOrStory as PreviewerOptions);
};

const _stackblitzPrefillConfig = async ({
  story,
  args: customArgs,
  customImports = [],
  customFunctionDefs = [],
  styles,
  title,
  additionalFiles = {},
}: PreviewerOptions) => {
  const args = {
    ...(story.args ?? {}),
    ...(customArgs ?? {}),
  };
  const rawSource = story.parameters.docs.source.originalSource;
  // Inject const args if the story references `args` anywhere (spread, destructure, or direct call)
  const hasArgsSpread =
    /(\.\.\.\s*args)|(\{\s*[^}]*\.\.\.[^}]*\}\s*=\s*args)|\bargs\b/.test(
      rawSource
    );
  const storyCode = filterStoryCode(rawSource, args);

  const componentNames = Object.keys(carbonComponents);
  const iconsNames = Object.keys(carbonIconsReact);

  // Find matched Carbon components — scan story body and any custom function definitions
  const scanCode = [storyCode, ...customFunctionDefs].join('\n');
  const matchedComponents = findComponentImports(componentNames, scanCode);

  // Find matched Carbon icons
  const matchedIcons = findIconImports(iconsNames, scanCode, componentNames);

  // Only include story scss for components actually used
  const componentsWithStyles = [
    ...new Set(matchedComponents.filter((item) => storyScssRegistry[item])),
  ];

  // Detect if we need flexbox grid enabled
  const hasFlexboxGridComponent = componentsWithStyles.some(
    (component) => component === 'FlexGrid'
  );

  // Enable flexbox grid only when needed
  const carbonBaseScss = hasFlexboxGridComponent ? flexGridScss : style;

  // Inline/append the SCSS content for each matched component
  const inlinedStoryScss = componentsWithStyles
    .map((item) => `\n${storyScssRegistry[item].content}`)
    .join('\n');

  // Strip license/copyright banners from custom styles before injecting
  const licenseCommentRegex =
    /\/\*\*?\s*\n?(?:\s*\*[^\n]*\n)*\s*\*?\s*(?:copyright|license|licensed|apache|mit|ibm corp|found in the|root directory)[^*]*\*\//gi;

  let styleImport = `${carbonBaseScss}${inlinedStoryScss}`;
  if (styles) {
    styleImport += `\n${styles.replace(licenseCommentRegex, '')}`;
  }

  // All Sass @use rules must appear at the top of the stylesheet.
  // Extract all @use statements, deduplicate, and place them at the start.
  const useRegex = /@use\s+['"][^'"]+['"][^;]*;/g;
  const useStatements = Array.from(
    new Set(styleImport.match(useRegex) ?? [])
  ).join('\n');
  const scssWithoutUses = styleImport.replace(useRegex, '').trimStart();
  const finalScss = `${useStatements}\n${scssWithoutUses}`;

  // Detect React hooks used in the story code and any custom function definitions
  const foundHooks = detectReactHooks(
    [storyCode, ...customFunctionDefs].join('\n')
  );
  const hooksString =
    foundHooks.length > 0 ? `, { ${foundHooks.join(', ')} }` : '';

  const formattedArgs = `const args = ${JSON.stringify(args, null, 2)};`;

  const app = `
import React${hooksString} from 'react';
${customImports.length > 0 ? customImports.join('\n') : ''}
${matchedComponents.length > 0 ? `import { ${matchedComponents.join(', ')} } from "@carbon/react";` : ''}
${matchedIcons.length > 0 ? `import { ${matchedIcons.join(', ')} } from "@carbon/icons-react";` : ''}
export default function App() {
  ${hasArgsSpread ? formattedArgs : ''}
  ${customFunctionDefs.length > 0 ? customFunctionDefs.join('\n') : ''}
  ${storyCode}
}
`;

  let formattedApp: string;
  try {
    formattedApp = await prettier.format(app, {
      ...(prettierConfig as object),
      parser: 'typescript',
      plugins: [tsParser, estreeParser],
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error formatting code with Prettier:', error);
    formattedApp = app;
  }

  const files: Project['files'] = {
    'package.json': packageJson,
    'index.html': index,
    'vite.config.ts': viteConfig,
    'tsconfig.json': tsconfig,
    'src/main.tsx': main,
    'src/App.tsx': formattedApp,
    'src/index.scss': finalScss,
    ...additionalFiles,
  };

  const stackblitzFileConfig: Project = {
    title: title || 'Carbon demo (TypeScript)',
    description:
      'Run official live example code for a Carbon component, created by Carbon Design System on StackBlitz using TypeScript',
    template: 'node',
    files,
  };

  StackBlitzSDK.openProject(stackblitzFileConfig, {
    newWindow: true,
    openFile: 'src/App.tsx',
  });
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const filterStoryCode = (
  storyCode: string,
  args: Record<string, unknown>
): string => {
  let updated = storyCode
    // Strip local relative imports (./foo or ../foo) — those files don't exist in StackBlitz
    .replace(/^\s*import\s+.*?from\s+['"][./][^'"]*['"]\s*;?\s*$/gm, '')
    // Replace action('...') with console.log — handles quoted strings containing parens
    .replace(
      /action\((?:'[^']*'|"[^"]*"|[^)])*\)(\(\))?/g,
      '(...args) => console.log(...args)'
    )
    // Replace context.viewMode !== 'docs' with false
    .replace(/context\.viewMode\s*!==\s*'docs'/g, 'false')
    // Remove surrounding quotes
    .replace(/^"|"$/g, '');

  // Unwrap outermost arrow function into component body:
  // Case 1: Block body `(...) => { ... }` -> unwrap outer curly braces
  // Case 2: Implicit return `(...) => (...)` or `(...) => <...>` -> replace with `return `
  if (/^\s*(?:\([^)]*\)|[\w]+)\s*=>\s*\{[\s\S]*\}\s*;?\s*$/.test(updated)) {
    updated = updated
      .replace(/^\s*(?:\([^)]*\)|[\w]+)\s*=>\s*\{\s*/, '')
      .replace(/\s*\}\s*;?\s*$/, '');
  } else if (/^\s*(?:\([^)]*\)|[\w]+)\s*=>/.test(updated)) {
    updated = updated.replace(/^\s*(?:\([^)]*\)|[\w]+)\s*=>\s*/, 'return ');
  }

  // Inline each arg value into the code
  Object.entries(args).forEach(([key, value]) => {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (typeof value === 'string') {
      // ${args.key} in template literals
      updated = updated.replace(
        new RegExp(`\\$\\{\\s*args\\.${escapedKey}\\s*\\}`, 'g'),
        value
      );
      // ={args.key} JSX attribute
      updated = updated.replace(
        new RegExp(`(=\\s*)\\{args\\.${escapedKey}\\}`, 'g'),
        `$1"${value}"`
      );
      // `${args.key}` standalone template literal
      updated = updated.replace(
        new RegExp(`\`\\$\\{args\\.${escapedKey}\\}\``, 'g'),
        `"${value}"`
      );
    } else {
      // Non-string: replace args.key with its JSON value
      updated = updated.replace(
        new RegExp(`args\\.${escapedKey}`, 'g'),
        JSON.stringify(value)
      );
    }
  });

  return updated;
};

const findComponentImports = (
  componentNames: string[],
  storyCode: string
): string[] => {
  return componentNames.filter((name) =>
    new RegExp(`(?:<${name}\\b|\\b${name}\\s*\\()`, 'g').test(storyCode)
  );
};

const findIconImports = (
  iconNames: string[],
  storyCode: string,
  componentNames: string[]
): string[] => {
  // Strip string literals and JSX text content before bare identifier matching
  // so that icon names appearing only as text (e.g. `label: 'Blockchain'` or
  // `<ListItem>Review pull requests</ListItem>`) are not mistakenly imported.
  const codeWithoutStrings = storyCode
    .replace(/`[^`]*`|'[^']*'|"[^"]*"/g, '""')
    .replace(/>[^\n<]+</g, '><');

  return iconNames.filter((name) => {
    const regexComponent = new RegExp(`<${name}\\b`, 'g');
    const regexCurlBraces = new RegExp(`{\\s*${name}\\s*}`, 'g');
    // Bare identifier usage (arrays, prop values) — checked against string-stripped code
    // e.g. `icons = [Dashboard, Activity]` or `renderIcon={Dashboard}`
    // Negative lookahead `(?!\s*[.(])` prevents matching built-in calls like
    // `Array.from(...)` or `Array(n)` which would emit
    // `import { Array } from '@carbon/icons-react'`, shadowing the global.
    const regexIdentifier = new RegExp(`\\b${name}\\b(?!\\s*[.(])`, 'g');
    return (
      (regexComponent.test(storyCode) ||
        regexCurlBraces.test(storyCode) ||
        regexIdentifier.test(codeWithoutStrings)) &&
      !componentNames.includes(name)
    );
  });
};

const detectReactHooks = (code: string): string[] => {
  const hooksToCheck = [
    'useState',
    'useEffect',
    'useContext',
    'useRef',
    'useCallback',
    'useMemo',
    'useReducer',
    'useLayoutEffect',
  ] as const;

  return hooksToCheck.filter((hook) =>
    new RegExp(`\\b${hook}\\s*\\(`).test(code)
  );
};
