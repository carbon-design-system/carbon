import React from 'react';
import StackBlitzSDK from '@stackblitz/sdk';
import sdk, { Project } from '@stackblitz/sdk';
import { index, main, packageJson, style, viteConfig } from './configFiles';
import * as carbonComponents from '../src/index';
import * as carbonIconsReact from '@carbon/icons-react';

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

  const stackblitzFileConfig: Project = {
    title: 'Carbon demo',
    description:
      'Run official live example code for a Carbon component, created by Carbon Design System on StackBlitz',
    template: 'node',
    files: {
      'package.json': packageJson,
      'index.html': index,
      'vite.config.js': viteConfig,
      'src/main.jsx': main,
      'src/App.jsx': app,
      'src/index.scss': style,
    },
  };

  StackBlitzSDK.openProject(stackblitzFileConfig, {
    newWindow: true,
    openFile: 'src/App.jsx',
  });
};
