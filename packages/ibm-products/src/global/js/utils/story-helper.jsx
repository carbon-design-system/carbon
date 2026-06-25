//
// Copyright IBM Corp. 2021, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import PropTypes from 'prop-types';
import pkg from '../package-settings';
import * as changeCase from 'change-case';
import { Button } from '@carbon/react';

export const checkCanaryStatus = (componentName) =>
  !pkg.isComponentEnabled(componentName, true) &&
  pkg.isComponentPublic(componentName, true)
    ? true
    : false;

/**
 * A helper component that returns a codesandbox link to an example codesandbox for the component.
 * The link URL is based on the example directory name and the standard codesandbox URL for package examples.
 */
const packagePath =
  'github/carbon-design-system/ibm-products/tree/main/examples/carbon-for-ibm-products';

export const codeSandboxHref = (exampleDirectory) =>
  `https://codesandbox.io/p/sandbox/${packagePath}/${exampleDirectory}?file=%2Fsrc%2FExample%2FExample.jsx`;

export const CodesandboxLink = ({ exampleDirectory }) => {
  const href = codeSandboxHref(exampleDirectory);

  return (
    <a href={href}>
      <img
        alt="Edit on CodeSandbox"
        src="https://codesandbox.io/static/img/play-codesandbox.svg"
      />
    </a>
  );
};
CodesandboxLink.propTypes = {
  /**
   * directory within examples codesandbox will be found
   */
  exampleDirectory: PropTypes.string,
};

export const stackblitzHref = (exampleDirectory) =>
  `https://stackblitz.com/${packagePath}/${exampleDirectory}?file=src%2FExample%2FExample.jsx`;

export const StackblitzLink = ({ exampleDirectory }) => {
  const href = stackblitzHref(exampleDirectory);

  return (
    <a href={href}>
      <img
        alt="Edit on Stackblitz"
        src="https://c.staticblitz.com/assets/favicon_sb-861fe1b85c0dc928750c62de15fed96fc75e57ee366bd937bad17a3938917b3f.svg"
      />
    </a>
  );
};
StackblitzLink.propTypes = {
  /**
   * directory within examples stackblitz will be found
   */
  exampleDirectory: PropTypes.string,
};

export const palUsageHref = (csfFile) => {
  const title = csfFile?.meta?.title;
  const [_pkg, kind, section] = title.split('/');

  if (/components|patterns/i.test(kind) && name) {
    return `https://pages.github.ibm.com/carbon/ibm-products/${kind}s/${changeCase.kebabCase(
      section
    )}/usage`;
  }
};

export const storyDocsPageTitle = (csfFile) => {
  const title = csfFile?.meta?.title;
  const [_pkg, kind, a, b, ...rest] = title.split('/');

  let component;

  if (/components|patterns/i.test(kind)) {
    // components and patterns have an additional level
    component = b;
  } else {
    component = a;
  }

  const name = component.split('#')[0]; // canary always written as Example#canary};

  if (name) {
    if (rest.length > 0) {
      return `${name} (${rest.join(' ')})`;
    } else {
      return name;
    }
  }

  console.error('Error: unable to parse title from metadata.');

  return title;
};

export const storyDocsPageInfo = (csfFile) => {
  const title = csfFile?.meta?.title;
  const [category, a, b, ...rest] = title.split('/');

  let result = {
    category,
    expectCodedExample: false,
  };
  let component;

  if (/components|patterns/i.test(category)) {
    result.expectCodedExample = true;
    // Required until components within 'Patterns' and 'Prebuilt' category
    // use the new approach with setting story titles because they are
    // nested an extra level
    if (a === ('Prebuilt patterns' || 'Onboarding')) {
      component = rest[0] ? rest[0] : b;
    } else if (typeof b === 'string') {
      component = b;
    } else {
      component = a;
    }

    result.section = a;

    result.guidelinesHref = `https://pages.github.ibm.com/carbon/ibm-products/${category.toLowerCase()}/${changeCase.kebabCase(
      result.section
    )}/usage`;
  } else {
    component = a;
  }

  const nameSplit = component.split('#'); // canary always written as Example#canary};
  const name = nameSplit[0];

  if (nameSplit.length > 1 && nameSplit[1] === 'canary') {
    result.canary = true;
  }

  if (name) {
    if (rest.length > 0) {
      result.component = result.title = `${name}`;
    } else {
      result.component = name;
      result.title = name;
    }
  } else {
    console.error('Error: unable to parse title from metadata.');
    result.title = title;
  }

  if (result.guidelinesHref) {
    result.guidelinesLinkLabel = `Usage guidelines`;
  }

  return result;
};

export const storyDocsGuidelines = (csfFile) => {
  const storyInfo = storyDocsPageInfo(csfFile);

  return {
    href: storyInfo.guidelinesHref,
    label: storyInfo.guidelinesLinkLabel,
  };
};

/**
 * A helper function that finds the designated theme on the Storybook canvas.
 * @returns "dark" or "light"
 */
export const getSelectedCarbonTheme = () => {
  const themeId = document
    .querySelector('[data-carbon-theme]')
    ?.getAttribute('data-carbon-theme');
  return themeId === 'g90' || themeId === 'g100' ? 'dark' : 'light';
};

/**
 * A helper function that returns a button that toggles a modal / side panel.
 * @returns {JSX.Element} A button that toggles any component.
 */
export const renderTrigger = ({ open, setOpen, buttonRef, prefix, name }) => (
  <Button
    ref={buttonRef}
    onClick={() => setOpen(!open)}
    className={`${prefix}toggle`}
  >
    {open ? `Close ${name}` : `Open ${name}`}
  </Button>
);
