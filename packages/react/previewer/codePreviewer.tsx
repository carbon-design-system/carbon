import StackBlitzSDK from '@stackblitz/sdk';
import sdk, { Project } from '@stackblitz/sdk';
import { index, main, packageJson, style, viteConfig } from './configFiles';
import * as carbonComponents from '../src/index';
// import * as carbonIcons from '../../icons-react/next';

export const stackblitzPrefillConfig = (
  code: any,
  // components: Array<string>, // Add all required components to be imported from @carbon/react
  icons: Array<string> // Add all required icons to be imported from @carbon/icons-react
) => {
  const componentCode = code.parameters.docs.source.originalSource;
  console.log({ componentCode });

  // console.log({ carbonIcons });

  const output = componentCode
    .replace(/^\s*args\s*=>\s*{\s*|}\s*;?\s*$/g, '')
    // Before: args => { <Component> }
    // After: <Component>
    .replace(/^"|"$/g, '')
    // Before: "<Component>"
    // After: <Component>
    .replace(/{\.\.\.args}/g, '')
    // Before: <Component {...args}>
    // After: <Component>
    .replace(/onChange=\{(args\.onChange|action\('onChange'\))\}\s*/g, '')
    .replace(/onClick=\{(args\.onClick|action\('onClick'\))\}\s*/g, '');
  // Remove the onClick/onChange action

  const componentNames = Object.keys(carbonComponents);

  // Function to find all matches
  const findAllImports = (componentNames: Array<string>, storyCode: string) => {
    return componentNames.filter((componentName) => {
      // Grab the component and add the "<" resulting in"`<ComponentName`
      const regex = new RegExp(`<${componentName}\\b`, 'g');
      // Check if the component exists in the `storyCode`
      return regex.test(storyCode);
    });
  };

  // Get all matched components
  const matchedComponents = findAllImports(componentNames, output);

  const app = `
  import React from 'react';
  import { ${matchedComponents} } from "@carbon/react";
  ${icons ? `import { ${icons} } from "@carbon/icons-react";` : ''}
  export default function App() {
    ${output}
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
