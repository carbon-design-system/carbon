/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import StackBlitzSDK from '@stackblitz/sdk';
import sdk, { Project } from '@stackblitz/sdk';
import { index, main, packageJson, style, viteConfig } from './configFiles';
import * as carbonComponents from '../src/index';
import * as carbonIconsReact from '@carbon/icons-react';
import {
  FlexGridScssRaw,
  GridScssRaw,
  HideAtBreakpointScssRaw,
  LayerScssRaw,
  ThemeScssRaw,
} from './stylesStorybook';

export const stackblitzPrefillConfig = (
  code: any,
  // components: Array<string>, // Add all required components to be imported from @carbon/react
  // icons: Array<string> // Add all required icons to be imported from @carbon/icons-react
  customImport: string
) => {
  const storyCode = code.parameters.docs.source.originalSource
    .replace(/^\s*args\s*=>\s*{\s*|}\s*;?\s*$/g, '')
    // Before: args => { <Component> }
    // After: <Component>
    .replace(/^\s*\(\)\s*=>\s*{/g, '') // We could delete this one if all stories had the return statement
    // Before: () => { <Component>
    // After: <Component>
    .replace(/^\s*args\s*=>/g, 'return')
    // Before: args => { <Component>
    // After: return <Component>
    .replace(/^"|"$/g, '')
    // Before: "<Component>"
    // After: <Component>
    .replace(/{\.\.\.args}/g, '')
    // Before: <Component {...args}>
    // After: <Component>
    .replace(/onChange=\{(args\.onChange|action\('onChange'\))\}\s*/g, '')
    .replace(/onClick=\{(args\.onClick|action\('onClick'\))\}\s*/g, '');
  // Remove the onClick/onChange action

  // Function to find all matches
  const findComponentImports = (
    componentNames: Array<string>,
    storyCode: string
  ) => {
    return componentNames.filter((componentName) => {
      // Grab the component and add the "<" resulting in"`<ComponentName`
      const regex = new RegExp(`<${componentName}\\b`, 'g');
      // Check if the component exists in the `storyCode`
      return regex.test(storyCode);
    });
  };

  // Get all matched components
  const componentNames = Object.keys(carbonComponents);
  const matchedComponents = findComponentImports(componentNames, storyCode);

  // Function to find all matches
  const findIconImports = (iconNames: Array<string>, storyCode: string) => {
    return iconNames.filter((iconName) => {
      // Grab the component to convert in "<Component" and "{Component}"
      const regexComponent = new RegExp(`<${iconName}\\b`, 'g');
      const regexCurlBraces = new RegExp(`{\\s*${iconName}\\s*}`, 'g');

      // Check if the component exists in the `storyCode`
      if (
        (regexComponent.test(storyCode) || regexCurlBraces.test(storyCode)) &&
        !componentNames.includes(iconName)
      ) {
        return iconName;
      }
    });
  };

  // Get all matched icons
  const iconsNames = Object.keys(carbonIconsReact);
  const matchedIcons = findIconImports(iconsNames, storyCode);

  // Registry of story scss strings we can inject
  const storyScssRegistry: Record<
    string,
    { filename: string; content: string }
  > = {
    FlexGrid: {
      filename: 'src/stories/FlexGrid.stories.scss',
      content: FlexGridScssRaw,
    },
    Grid: {
      filename: 'src/stories/Grid.stories.scss',
      content: GridScssRaw,
    },
    HideAtBreakpoint: {
      filename: 'src/stories/HideAtBreakpoint.stories.scss',
      content: HideAtBreakpointScssRaw,
    },
    Layer: {
      filename: 'src/stories/Layer.stories.scss',
      content: LayerScssRaw,
    },
    Theme: {
      filename: 'src/stories/Theme.stories.scss',
      content: ThemeScssRaw,
    },
  };

  // Only include story scss for components actually used
  const componentsWithStyles = matchedComponents.filter(
    (c) => storyScssRegistry[c]
  );
  console.error('componentsWithStyles');

  // Detect if we need flexbox grid enabled
  const hasFlexboxGridComponent = componentsWithStyles.some(
    (component) => component === 'Grid' || component === 'FlexGrid'
  );
  console.error('hasFlexboxGridComponent');

  // index.scss = base style + conditional @use for story scss
  const indexScss = `
${
  hasFlexboxGridComponent
    ? `@use '@carbon/react' with (
  $font-path: '@ibm/plex',
  $use-flexbox-grid: true
);`
    : style
}

${componentsWithStyles.map((c) => `@use './stories/${c}.stories.scss';`).join('\n')}
`;

  // Generate App.jsx code
  const app = `
  import React from 'react';
  ${customImport ? customImport : ''}
  import { ${matchedComponents} } from "@carbon/react";
  ${matchedIcons.length > 0 ? `import { ${matchedIcons} } from "@carbon/icons-react";` : ''}
  export default function App() {
    ${storyCode}
  }
  `;

  // Build files, injecting only the needed .stories.scss files
  const files: Project['files'] = {
    'package.json': packageJson,
    'index.html': index,
    'vite.config.js': viteConfig,
    'src/main.jsx': main,
    'src/App.jsx': app,
    'src/index.scss': indexScss,
  };

  // Attach the actual story scss contents
  for (const componentName of componentsWithStyles) {
    const { filename, content } = storyScssRegistry[componentName];
    files[filename] = content;
  }

  const stackblitzFileConfig: Project = {
    title: 'Carbon demo',
    description:
      'Run official live example code for a Carbon component, created by Carbon Design System on StackBlitz',
    template: 'node',
    files,
  };

  StackBlitzSDK.openProject(stackblitzFileConfig, {
    newWindow: true,
    openFile: 'src/App.jsx',
  });
};
