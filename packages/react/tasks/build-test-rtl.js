'use strict';

const prettier = require('prettier');
const CarbonComponents = require('@carbon/react');
const enquirer = require('enquirer');
const fs = require('fs-extra');
const path = require('path');

// Writes test file. Takes in the component's props, name, and whether or not it is a subcomponent (i.e. DataTable or UIShell inner components)
function writeTestFile(props, componentName, isSubComponent) {
  let propTests = '';
  props.forEach((prop) => {
    let test;
    if (prop === 'children') {
      test = `it('should render children as expected', () => {
                render(<${componentName}>add appropriate children</${componentName}>)

                expect(); 
            });\n\n`;
    } else if (prop === 'className') {
      test = `it('should support a custom \`className\` prop on the outermost element', () => {
            const { container } = render(<${componentName} className="custom-class" />)

            expect(container.firstChild).toHaveClass('custom-class'); 
        });\n\n`;
    } else if (
      prop === 'onClick' ||
      prop === 'onKeyDown' ||
      prop === 'onBlur' ||
      prop === 'onMouseEnter' ||
      prop === 'onMouseLeave' ||
      prop === 'onFocus'
    ) {
      test = `it('should call ${prop} when expected', () => {
            const ${prop} = jest.fn();
            render(<${componentName} ${prop}={${prop}} />)

            // perform action to call ${prop}

            expect($prop).toHaveBeenCalled(); 
        });\n\n`;
    } else {
      test = `it('should respect ${prop} prop', () => {
            render(<${componentName} ${prop} />); 
    
            expect();
        });\n\n`;
    }

    propTests = propTests + test;
  });

  const testFile = isSubComponent
    ? `import React from 'react';
  import ${componentName} from '../${componentName}';
  import userEvent from '@testing-library/user-event';
  import { render, screen } from '@testing-library/react';
  
  describe('${componentName}', () => {
    describe('renders as expected - Component API', () => {
      it('should spread extra props onto outermost element', () => {
        const { container } = render(<${componentName} data-testid="test-id" />)

        expect(container.firstChild).toHaveAttribute('data-testid', 'test-id'); 
      })

      ${propTests}
    });

    describe('behaves as expected', () => {
      // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
    })
  });
  `
    : `
  import React from 'react';
  import ${componentName} from './${componentName}';
  import userEvent from '@testing-library/user-event';
  import { render, screen } from '@testing-library/react';
  
  describe('${componentName}', () => {
    describe('renders as expected - Component API', () => {
      it('should spread extra props onto outermost element', () => {
        const { container } = render(<${componentName} data-testid="test-id" />)

        expect(container.firstChild).toHaveAttribute('data-testid', 'test-id'); 
      })
      
      ${propTests}
    });

    describe('behaves as expected', () => {
      // Add tests for relevant component behavior. For more information, visit https://github.com/carbon-design-system/carbon/issues/10184#issuecomment-992978122
    })
  });
  `;

  return prettier.format(testFile, { parser: 'babel', singleQuote: true });
}

async function main() {
  // Carbon components to generate list of choices
  const components = Object.keys(CarbonComponents);

  // prompts user to select component to write tests for
  const response = await enquirer.prompt({
    type: 'autocomplete',
    name: 'component',
    message: 'Which component are you writing tests for?',
    limit: 10,
    choices: components,
  });

  const componentName = response.component;

  // Gets component props
  const propTypes = CarbonComponents[componentName].propTypes;
  if (!propTypes) {
    console.error('This component might not be suited for test generation :(');
    return;
  }

  const props = Object.keys(propTypes);

  const files = await fs.readdir(path.join(__dirname, '../src/components'));

  // Generate path to the component's tests
  let pathToComponent = '';
  let isSubComponent = false;

  for await (const file of files) {
    let skeletonComponent;
    if (componentName.includes('Skeleton')) {
      skeletonComponent = componentName.slice(
        0,
        componentName.length - 'Skeleton'.length
      );
    }

    const subFiles = await fs.readdir(
      path.join(__dirname, `../src/components/${file}`)
    );

    const skeletonFound = subFiles.find(
      (subFile) => subFile === `${skeletonComponent}.Skeleton.js`
    );

    let found;
    if (!skeletonFound) {
      found = subFiles.find((subFile) => subFile === `${componentName}.js`);
    }

    const testFolderExists = await fs.pathExists(
      path.join(__dirname, `../src/components/${file}/__tests__/`)
    );

    // if true, component is a "base" component (i.e Button, CheckBox, etc) otherwise it is a sub-component (i.e Table, Header, TableToolBar, etc)
    const componentPathExists = await fs.pathExists(
      path.join(
        __dirname,
        `../src/components/${componentName}/${componentName}.js`
      )
    );

    if (!componentPathExists) {
      isSubComponent = true;
    }

    if (skeletonFound && testFolderExists) {
      pathToComponent = path.join(
        __dirname,
        `../src/components/${skeletonComponent}/__tests__/${componentName}-test__copy.js`
      );
      break;
    }

    if (skeletonFound && !testFolderExists) {
      pathToComponent = path.join(
        __dirname,
        `../src/components/${skeletonComponent}/${componentName}-test__copy.js`
      );
      break;
    }

    if (found && testFolderExists) {
      pathToComponent = path.join(
        __dirname,
        `../src/components/${file}/__tests__/${componentName}-test__copy.js`
      );
      break;
    }

    if (found && !testFolderExists) {
      pathToComponent = path.join(
        __dirname,
        `../src/components/${file}/${componentName}-test__copy.js`
      );
      break;
    }
  }

  const testFile = writeTestFile(props, componentName, isSubComponent);

  await fs.writeFile(pathToComponent, testFile);

  console.log(`Test file created for ${componentName}! 🎉`);
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
