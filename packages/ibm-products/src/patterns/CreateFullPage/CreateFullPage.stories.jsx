/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './_storybook-styles.scss?inline';
import DocsPage from './CreateFullPage.mdx';
import { StandardCreateFullPage as StandardCreateFullPageComponent } from './example/preview-components/StandardCreateFullPage';
import { CreateFullPageWithSections as CreateFullPageWithSectionsComponent } from './example/preview-components/CreateFullPageWithSections';
import { CreateFullPageWithHeader as CreateFullPageWithHeaderComponent } from './example/preview-components/CreateFullPageWithHeader';
import { CreateFullPageWithStepInErrorState as CreateFullPageWithStepInErrorStateComponent } from './example/preview-components/CreateFullPageWithStepInErrorState';
import { CreateFullPageWithGlobalHeader as CreateFullPageWithGlobalHeaderComponent } from './example/preview-components/CreateFullPageWithGlobalHeader';

export default {
  title: 'Patterns/Create flows/Create Full Page',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    layout: 'fullscreen',
    docs: {
      page: DocsPage,
    },
  },
};

const CreateFullPagePattern = (args) => {
  return <StandardCreateFullPageComponent {...args} />;
};

export const CreateFullPage = CreateFullPagePattern.bind({});
CreateFullPage.args = {};
CreateFullPage.parameters = {
  layout: 'fullscreen',
};

const CreateFullPageWithSectionsPattern = (args) => {
  return <CreateFullPageWithSectionsComponent {...args} />;
};

export const CreateFullPageWithSections =
  CreateFullPageWithSectionsPattern.bind({});
CreateFullPageWithSections.args = {};
CreateFullPageWithSections.parameters = {
  layout: 'fullscreen',
};

const CreateFullPageWithHeaderPattern = (args) => {
  return <CreateFullPageWithHeaderComponent {...args} />;
};

export const CreateFullPageWithHeader = CreateFullPageWithHeaderPattern.bind(
  {}
);
CreateFullPageWithHeader.args = {};
CreateFullPageWithHeader.parameters = {
  layout: 'fullscreen',
};

const CreateFullPageWithStepInErrorStatePattern = (args) => {
  return <CreateFullPageWithStepInErrorStateComponent {...args} />;
};

export const CreateFullPageWithStepInErrorState =
  CreateFullPageWithStepInErrorStatePattern.bind({});
CreateFullPageWithStepInErrorState.args = {};
CreateFullPageWithStepInErrorState.parameters = {
  layout: 'fullscreen',
};

const CreateFullPageWithGlobalHeaderPattern = (args) => {
  return <CreateFullPageWithGlobalHeaderComponent {...args} />;
};

export const CreateFullPageWithGlobalHeader =
  CreateFullPageWithGlobalHeaderPattern.bind({});
CreateFullPageWithGlobalHeader.args = {};
CreateFullPageWithGlobalHeader.parameters = {
  layout: 'fullscreen',
};
