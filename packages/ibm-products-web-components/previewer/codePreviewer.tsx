/**
 * Copyright IBM Corp. 2026
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
  tsconfig,
  viteConfig,
  rootStyleFooter,
  rootStyleImports,
} from './configFiles';
import * as carbonComponentsWC from '@carbon/web-components/es/index.js';
import * as carbonIconsWC from '@carbon/icons';

const iconsNames = Object.keys(carbonIconsWC);
const carbonComponentNames = Object.keys(carbonComponentsWC);

let componentNames: string[];
interface ComponentSources {
  carbon: string[];
  ibmProducts: string[];
  ibmProductsSubComp: string[];
  icons: string[];
  unknown: string[];
}

interface previewerObject {
  story: any;
  customImports: string[];
  customFunctionDefs: string[];
  title: string;
  componentName: string;
}
export const stackblitzPrefillConfig = async ({
  story,
  customImports = [],
  customFunctionDefs = [],
  title,
  componentName,
}: previewerObject) => {
  const { args } = story;
  const productComponents = await import('../src/index');
  componentNames = Object.keys(productComponents);
  const storyCode = filterStoryCode(
    story.parameters.docs.source.originalSource,
    args
  );
  //get story assets - fetch only svg
  function getStoryAssetFiles(componentName?: string) {
    if (!componentName) {
      return {};
    }

    const files: Record<string, string> = {};

    // Load ALL story assets
    const modules = import.meta.glob('/src/components/*/_story-assets/*', {
      as: 'raw',
      eager: true,
    });

    Object.entries(modules).forEach(([path, content]) => {
      // path example:
      // /src/components/about-modal/_story-assets/example-logo.svg

      const match = path.match(
        /\/src\/components\/([^/]+)\/_story-assets\/(.+)$/
      );
      if (!match) {
        return;
      }

      const [, folderName, fileName] = match;

      // only include assets for requested component
      if (folderName === componentName) {
        files[`src/story-assets/${fileName}`] = content as string;
      }
    });
    return files;
  }
  const app = await appGenerator(
    storyCode,
    customImports,
    customFunctionDefs,
    args
  );

  //separate scss imports and selectors - to wrap the selectors inside :host{}
  function wrapSelectorsWithHost(scss: string): string {
    const lines = scss.split('\n');

    let splitIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Allow imports, variables, mixins, comments at top
      if (
        line.startsWith('@use') ||
        line.startsWith('@forward') ||
        line.startsWith('$') ||
        line.startsWith('@mixin') ||
        line.startsWith('//') ||
        line.startsWith('/*') ||
        line === ''
      ) {
        splitIndex = i + 1;
        continue;
      }
      // First real selector reached
      break;
    }

    const styleHeaders = lines.slice(0, splitIndex).join('\n');
    const selectors = lines.slice(splitIndex).join('\n');

    if (!selectors.trim()) {
      return scss;
    }

    return `
    ${styleHeaders}

    :host {
    ${selectors}
    }
    `;
  }

  const scssImports = (c: string) =>
    (!/@carbon\/styles\/scss\/theme/.test(c)
      ? "@use '@carbon/styles/scss/theme';\n"
      : '') +
    (!/@carbon\/styles\/scss\/themes/.test(c)
      ? "@use '@carbon/styles/scss/themes';\n"
      : '');

  //copying style file to stackblitz
  function getStyleFile(componentName?: string) {
    if (!componentName) {
      return {};
    }
    const files: Record<string, string> = {};

    // Grab all story-styles.scss in components folder
    const modules = import.meta.glob('/src/components/*/story-styles.scss', {
      as: 'raw',
      eager: true,
    });

    // Track whether we found a file for this component
    let found = false;

    Object.entries(modules).forEach(([path, content]) => {
      const match = path.match(/\/components\/([^/]+)\//);
      const folderName = match?.[1];

      if (folderName === componentName && content) {
        found = true;
        // Remove license comments
        const licenseCommentRegex =
          /\/\*\*?\s*\n?(?:\s*\*[^\n]*\n)*\s*\*?\s*(?:copyright|license|licensed|apache|mit|ibm corp|found in the|root directory)[^*]*\*\//gi;
        const cleanContent = (content as string).replace(
          licenseCommentRegex,
          ''
        );
        // import only missing Carbon imports
        const carbonImports = scssImports(cleanContent);
        // Wrap selectors with :host {}
        const wrappedContent = wrapSelectorsWithHost(cleanContent);

        files['src/index.scss'] =
          carbonImports + wrappedContent + rootStyleFooter;
      }
    });

    // If no file found, still create index.scss with root imports + footer
    if (!found) {
      files['src/index.scss'] = rootStyleImports + rootStyleFooter;
    }
    return files;
  }

  const assetFiles = getStoryAssetFiles(componentName);
  const styleFiles = getStyleFile(componentName);

  const stackblitzFileConfig: Project = {
    title: title || 'Carbon demo (TypeScript)',
    description:
      'Run official live example code for a Carbon web component, created by Carbon Design System on StackBlitz using TypeScript',
    template: 'node',
    files: {
      'package.json': packageJson,
      'index.html': index,
      'vite.config.ts': viteConfig,
      'tsconfig.json': tsconfig,
      'src/main.ts': main,
      'src/App.ts': app,
      ...styleFiles,
      ...assetFiles,
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
    // adding const before `args =>` and remove argTypes
    .replace(/^\s*args\s*:\s*{/, 'const args = {')
    .replace(/^\s*argTypes\s*,?\s*$/m, '')
    // Remove ALL action() calls (including template literals and invocations)
    .replace(/action\(([^)]*)\)(\(\))?/g, '')
    // Replace ONLY `context.viewMode !== 'docs'` with `false` (your specific case)
    .replace(/context\.viewMode\s*!==\s*'docs'/g, 'false')
    // Remove quotes/action handlers (unchanged)
    .replace(/^"|"$/g, '')
    //Remove the args block and the render wrapper (with or without TypeScript type annotations)
    .replace(
      /{\s*args:\s*{[\s\S]*?}\s*,\s*render:\s*\(?\s*args\s*(?::\s*any)?\s*\)?\s*=>\s*{/,
      ''
    )
    //Remove the args block with defaultArgs reference
    .replace(
      /\{\s*args:\s*defaultArgs\s*,\s*render:\s*\(?\s*args\s*(?::\s*any)?\s*\)?\s*=>\s*\{/g,
      ''
    )
    //replace the render closing braces
    .replace(/}\s*$/, '')
    // Remove <style>${styles}</style> injections anywhere
    .replace(/<style>\s*\$\{styles\}\s*<\/style>/g, '');

  // Replace all placeholders in the code with actual arg values
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
      // Replace template literals with JSON-stringified values : html`<span>${args.label}</span>` => html`<span>"Submit"</span>`
      storyCodeUpdated = storyCodeUpdated.replace(
        templateLiteralRegex,
        JSON.stringify(value)
      );
      // Replace JSX attribute placeholders : <cds-button label={args.label} /> => <cds-button label="Submit" />
      storyCodeUpdated = storyCodeUpdated.replace(
        jsxAttributeRegex,
        `$1"${value}"`
      );
      // Replace strings inside template literals : `${args.label}` => "Submit"
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

const getComponentImportPath = (
  comp: string,
  allComponents: string[]
): string => {
  // Check if this component is a subcomponent of another component
  // e.g., coachmark-beacon, coachmark-body are subcomponents of coachmark
  const parts = comp.split('-');

  for (let i = parts.length - 1; i >= 1; i--) {
    const potentialParent = parts.slice(0, i).join('-');
    // Check if the parent exists in the components list
    if (allComponents.includes(potentialParent)) {
      // This is a subcomponent, use nested path
      return `${potentialParent}/${comp}`;
    }
  }
  // Not a subcomponent, use regular path
  return comp;
};

const appGenerator = async (
  storyCode: string,
  customImports: Array<string>,
  customFunctionDefs: Array<string>,
  args: any
) => {
  const {
    carbon: matchedCarbonComponents,
    ibmProducts: matchedComponents,
    icons: matchedIcons,
    unknown: unknownComponents,
  } = findComponentsInCode(storyCode);
  if (unknownComponents.length > 0) {
    storyCode = removeUnknownComponents(storyCode, unknownComponents);
  }

  const regex = /(\.\.\.\s*args)|(\{\s*[^}]*\.\.\.[^}]*\}\s*=\s*args)/;
  const hasArgs = regex.test(storyCode);

  const formattedArgs = `const args = ${JSON.stringify(args, null, 2)};`;
  const filterDerivedComponents = (arr) =>
    arr.filter(
      (item) =>
        !arr.some((other) => other !== item && item.startsWith(`${other}-`))
    );
  const filteredCarbonComponents = filterDerivedComponents(
    matchedCarbonComponents
  );

  // Generate App.jsx code
  const app = `

  import { LitElement, html, unsafeCSS } from 'lit';
  import { customElement } from 'lit/decorators.js';
  ${customImports?.length > 0 ? customImports?.map((customImport) => customImport) : ''}
  ${
    matchedComponents.length > 0
      ? matchedComponents
          .map((comp: string) => {
            const importPath = getComponentImportPath(comp, matchedComponents);
            return `import '@carbon/ibm-products-web-components/es/components/${importPath}/index.js';`;
          })
          .join('\n')
      : ''
  }
   ${
     filteredCarbonComponents.length > 0
       ? filteredCarbonComponents
           .map(
             (comp) =>
               `import '@carbon/web-components/es/components/${comp}/index.js';`
           )
           .join('\n')
       : ''
   }
  ${matchedIcons.length > 0 ? `import { ${matchedIcons.join(', ')} } from "@carbon/icons";` : ''}
  import styles from './index.scss?inline';
  
  @customElement('my-app')
  export class MyApp extends LitElement {
    static styles = unsafeCSS(styles);
    
    render() {
      const prefix = 'c4p';
      ${customFunctionDefs?.length > 0 ? customFunctionDefs.join('\n') : ''}
      ${hasArgs ? formattedArgs : ''}
   
      ${storyCode}
    }
  }
`;

  return app.trim();
};

const findComponentsInCode = (code: string): ComponentSources => {
  const componentRegex = /<\s*((?:c4p|cds)-[a-z0-9-]+)(?=[\s>])/gi;
  const matches: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = componentRegex.exec(code)) !== null) {
    matches.push(match[1]);
  }
  const componentNamesInCode = [...new Set(matches)];

  const result: ComponentSources = {
    carbon: [],
    ibmProducts: [],
    ibmProductsSubComp: [],
    icons: [],
    unknown: [],
  };
  //cds-button -> Button
  const normalizedCarbon = carbonComponentNames.map((name) =>
    name
      .replace(/^(cds)/i, '')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
  );

  //c4p-user-avatar -> UserAvatar
  const normalizedProducts = componentNames.map((name) =>
    name
      .replace(/^(CDS)/i, '')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')
  );

  componentNamesInCode.forEach((component) => {
    //c4p-user-avatar to UserAvatar
    const normalized = component
      .replace(/^(c4p-|cds-)/i, '')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');

    if (normalizedCarbon.includes(normalized)) {
      result.carbon.push(component.replace(/^(cds-)/i, ''));
    } else if (normalizedProducts.includes(normalized)) {
      result.ibmProducts.push(component.replace(/^(c4p-)/i, ''));
    } else if (iconsNames.includes(component)) {
      result.icons.push(component);
    } else if (component.startsWith('c4p-')) {
      // Check if this is a subcomponent of a known c4p component
      // e.g., c4p-coachmark-body is a subcomponent of c4p-coachmark
      // Extract parent component names by removing the last segment
      const parts = component.split('-');
      let isSubcomponent = false;

      for (let i = parts.length - 1; i >= 2; i--) {
        const potentialParent = parts.slice(0, i).join('-');
        const parentNormalized = potentialParent
          .replace(/^(c4p-)/i, '')
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join('');

        if (normalizedProducts.includes(parentNormalized)) {
          // This is a subcomponent of a known product component
          result.ibmProductsSubComp.push(component.replace(/^(c4p-)/i, ''));
          isSubcomponent = true;
          break;
        }
      }

      if (!isSubcomponent) {
        result.unknown.push(component);
      }
    } else {
      result.unknown.push(component);
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
