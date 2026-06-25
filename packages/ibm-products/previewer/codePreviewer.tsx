/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StackBlitzSDK from '@stackblitz/sdk';
import { Project } from '@stackblitz/sdk';
import {
  index,
  main,
  packageJson,
  style,
  tsconfig,
  viteConfig,
} from './configFiles';
import * as carbonComponentsReact from '@carbon/react';
import * as carbonIconsReact from '@carbon/react/icons';
import * as prettier from 'prettier/standalone';
import * as tsParser from 'prettier/plugins/typescript';
import * as estreeParser from 'prettier/plugins/estree';
import prettierConfig from 'prettier-config-carbon';

const iconsNames = Object.keys(carbonIconsReact);
const carbonComponentNames = Object.keys(carbonComponentsReact);
let componentNames: string[];
interface ComponentSources {
  carbon: string[];
  ibmProducts: string[];
  icons: string[];
  unknown: string[];
}

type statusType = null | {
  preview?: string[];
  previewCandidate?: string[];
};

interface previewerObject {
  story: any;
  customImports: string[];
  customFunctionDefs: string[];
  styles: string;
  title: string;
  status?: statusType;
}
export const stackblitzPrefillConfig = async ({
  story,
  customImports = [],
  customFunctionDefs = [],
  styles,
  title,
  status = null,
}: previewerObject) => {
  const { args } = story;
  const productComponents = await import('../src/index');
  componentNames = Object.keys(productComponents);
  const storyCode = filterStoryCode(
    story.parameters.docs.source.originalSource,
    args
  );
  const app = await appGenerator(
    storyCode,
    customImports,
    customFunctionDefs,
    args,
    status
  );
  let styleImport = style;
  if (styles) {
    // This regex matches multi-line comments that start with /* and end with */
    // It specifically looks for comments containing common license keywords
    const licenseCommentRegex =
      /\/\*\*?\s*\n?(?:\s*\*[^\n]*\n)*\s*\*?\s*(?:copyright|license|licensed|apache|mit|ibm corp|found in the|root directory)[^*]*\*\//gi;
    styleImport += styles.replace(licenseCommentRegex, '');
  }
  const stackblitzFileConfig: Project = {
    title: title || 'Carbon demo (TypeScript)',
    description:
      'Run official live example code for a Carbon component, created by Carbon Design System on StackBlitz using TypeScript',
    template: 'node',
    files: {
      'package.json': packageJson,
      'index.html': index,
      'vite.config.ts': viteConfig,
      'tsconfig.json': tsconfig,
      'src/main.tsx': main,
      'src/App.tsx': app,
      'src/index.scss': styleImport,
    },
  };

  StackBlitzSDK.openProject(stackblitzFileConfig, {
    newWindow: true,
    openFile: 'src/App.tsx',
  });
};

const filterStoryCode = (storyCode, args) => {
  let storyCodeUpdated = storyCode
    // Remove arrow functions
    .replace(/^\s*(\([^)]*\)|[\w]+)\s*=>\s*{\s*|}\s*;?\s*$/g, '')
    // Remove empty arrow wrappers
    .replace(/^\s*\(\)\s*=>\s*{/g, '')
    // Replace `args =>` with `return`
    .replace(/^\s*args\s*=>/g, 'return')
    // Remove ALL action() calls (including template literals and invocations)
    .replace(/action\(([^)]*)\)(\(\))?/g, '')
    // Replace ONLY `context.viewMode !== 'docs'` with `false` (your specific case)
    .replace(/context\.viewMode\s*!==\s*'docs'/g, 'false')
    // Remove quotes/action handlers (unchanged)
    .replace(/^"|"$/g, '')
    .replace(/onChange=\{(args\.onChange|action\('onChange'\))\}\s*/g, '')
    .replace(/onClick=\{(args\.onClick|action\('onClick'\))\}\s*/g, '');
  Object.entries((args = args ?? {})).forEach(([key, value]) => {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const templateLiteralRegex = new RegExp(
      `\\$\\{\\s*args\\.${escapedKey}\\s*\\}`,
      'g'
    );
    const jsxAttributeRegex = new RegExp(
      `(=\\s*)\\{args\\.${escapedKey}\\}`,
      'g'
    );
    const stringInTemplateRegex = new RegExp(
      `\`\\$\\{args\\.${escapedKey}\\}\``,
      'g'
    );
    if (typeof value === 'string') {
      storyCodeUpdated = storyCodeUpdated.replace(templateLiteralRegex, value);
      storyCodeUpdated = storyCodeUpdated.replace(
        jsxAttributeRegex,
        `$1"${value}"`
      );
      storyCodeUpdated = storyCodeUpdated.replace(
        stringInTemplateRegex,
        `"${value}"`
      );
    } else {
      const valueStr = JSON.stringify(value);
      const regex = new RegExp(`args\\.${escapedKey}`, 'g');
      storyCodeUpdated = storyCodeUpdated.replace(regex, valueStr);
    }
  });
  return storyCodeUpdated;
};

const formatWithPrettier = async (code: string): Promise<string> => {
  const formatted = await prettier.format(code, {
    ...prettierConfig,
    parser: 'typescript',
    plugins: [tsParser, estreeParser],
  });
  return formatted;
};

const appGenerator = async (
  storyCode: string,
  customImports: Array<string>,
  customFunctionDefs: Array<string>,
  args: any,
  status: statusType
) => {
  const {
    carbon: matchedCarbonComponents,
    ibmProducts: matchedComponents,
    icons: matchedIcons,
    unknown: unknownComponents,
  } = findComponentsInCode(storyCode, status);
  if (unknownComponents.length > 0) {
    storyCode = removeUnknownComponents(storyCode, unknownComponents);
  }
  const getProductsImports = (imports: string[]) => {
    const getImportSpecifiers = (names: string[]) => {
      return names.map((name) => {
        if (
          name.startsWith('preview__') ||
          name.startsWith('previewCandidate__')
        ) {
          return `${name} as ${name.replace(/^(preview__|previewCandidate__)/, '')}`;
        }
        return name;
      });
    };
    return imports.length > 0
      ? `import { ${getImportSpecifiers(imports)} } from "@carbon/ibm-products";`
      : '';
  };

  const foundHooks = detectReactHooks(storyCode);
  const hooksString = foundHooks.join(', ');
  const regex = /(\.\.\.\s*args)|(\{\s*[^}]*\.\.\.[^}]*\}\s*=\s*args)/;
  const hasArgs = regex.test(storyCode);
  // Generate App.jsx code
  const formattedArgs = `const args = ${JSON.stringify(args, null, 2)};`;
  const app = `
  import React ${hooksString != '' ? `, { ${hooksString} }` : ''} from 'react';
  ${customImports?.length > 0 ? customImports.join('\n') : ''}
  ${getProductsImports(matchedComponents)}
  ${matchedCarbonComponents.length > 0 ? `import { ${matchedCarbonComponents.join(', ')} } from "@carbon/react";` : ''}
  ${matchedIcons.length > 0 ? `import { ${matchedIcons.join(', ')} } from "@carbon/icons-react";` : ''}
  export default function App() {
    ${hasArgs ? formattedArgs : ''}
    const pkg = {
     prefix: 'c4p'
    }
    ${customFunctionDefs?.length > 0 ? customFunctionDefs.join('\n') : ''}
    ${storyCode}
  }
  `;

  try {
    return await formatWithPrettier(app);
  } catch (error) {
    console.error('Error formatting code:', error);
    throw error;
  }
};

// Returns either `preview` or `previewCandidate` if value is found within
// one of those properties from the `status`. Otherwise we return null
const findPropertyContainingValue = (obj: statusType, value: string) => {
  for (const prop in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, prop) &&
      Array.isArray(obj[prop])
    ) {
      if (obj[prop].includes(value)) {
        return prop;
      }
    }
  }
  return null;
};

const findComponentsInCode = (code: string, status): ComponentSources => {
  const componentRegex = /<([A-Z][a-zA-Z0-9]*)(?:\s|>|.)/g;
  const matches: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = componentRegex.exec(code)) !== null) {
    matches.push(match[1]);
  }
  const componentNamesInCode = [...new Set(matches)];
  const result: ComponentSources = {
    carbon: [],
    ibmProducts: [],
    icons: [],
    unknown: [],
  };

  // Helper function to handle status-based component classification
  const addComponentWithStatus = (
    component: string,
    targetArray: 'ibmProducts' | 'unknown'
  ) => {
    if (status) {
      const foundStatus = findPropertyContainingValue(status, component);
      if (foundStatus === 'preview' || foundStatus === 'previewCandidate') {
        result.ibmProducts.push(`${foundStatus}__${component}`);
      } else {
        result[targetArray].push(component);
      }
    } else if (targetArray === 'ibmProducts') {
      result.ibmProducts.push(component);
    }
  };

  componentNamesInCode.forEach((component) => {
    if (carbonComponentNames.includes(component)) {
      result.carbon.push(component);
    } else if (componentNames.includes(component)) {
      // status: {
      //   preview: string[] of component names
      //   previewCandidate: string[] of component names
      // }
      addComponentWithStatus(component, 'ibmProducts');
    } else if (iconsNames.includes(component)) {
      result.icons.push(component);
    } else {
      addComponentWithStatus(component, 'unknown');
    }
  });
  return result;
};

const removeUnknownComponents = (storyCode, unknownComponents) => {
  const openingTagPattern = new RegExp(
    `<(${unknownComponents.join('|')})(\\s+[^>]*)?/?>`,
    'g'
  );
  const closingTagPattern = new RegExp(
    `</(${unknownComponents.join('|')})>`,
    'g'
  );
  let cleanedCode = storyCode.replace(openingTagPattern, '');
  cleanedCode = cleanedCode.replace(closingTagPattern, '');
  return cleanedCode;
};

function detectReactHooks(sanitizedCode: string): string[] {
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
  const foundHooks: string[] = [];

  hooksToCheck.forEach((hook) => {
    const regex = new RegExp(`\\b${hook}\\s*\\(`);
    if (regex.test(sanitizedCode)) {
      foundHooks.push(hook);
    }
  });

  return foundHooks;
}
