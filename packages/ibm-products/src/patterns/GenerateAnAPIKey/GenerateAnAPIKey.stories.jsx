/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DocsPage from './GenerateAnAPIKey.mdx';
import { InstantGenerate } from './example/preview-components/InstantGenerate';
import { Generate } from './example/preview-components/Generate';
import { Edit } from './example/preview-components/Edit';
import { GenerateWithError } from './example/preview-components/GenerateWithError';
import { EditWithError } from './example/preview-components/EditWithError';
import { CustomGenerate } from './example/preview-components/CustomGenerate';
import { CustomEdit } from './example/preview-components/CustomEdit';

export default {
  title: 'Patterns/Generate an API key',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const InstantTemplate = (args) => {
  return <InstantGenerate {...args} />;
};

const GenerateTemplate = (args) => {
  return <Generate {...args} />;
};

const EditTemplate = (args) => {
  return <Edit {...args} />;
};

const GenerateWithErrorTemplate = (args) => {
  return <GenerateWithError {...args} />;
};

const EditWithErrorTemplate = (args) => {
  return <EditWithError {...args} />;
};

const CustomGenerateTemplate = (args) => {
  return <CustomGenerate {...args} />;
};

const CustomEditTemplate = (args) => {
  return <CustomEdit {...args} />;
};

export const generate = GenerateTemplate.bind({});
generate.storyName = 'Generate';
generate.args = {};

export const generateWithError = GenerateWithErrorTemplate.bind({});
generateWithError.storyName = 'Generate With Error';
generateWithError.args = {};

export const instantGenerate = InstantTemplate.bind({});
instantGenerate.storyName = 'Instant generate';
instantGenerate.args = {};

export const customGenerate = CustomGenerateTemplate.bind({});
customGenerate.storyName = 'Custom Generate';
customGenerate.args = {};

export const edit = EditTemplate.bind({});
edit.storyName = 'Edit';
edit.args = {};

export const editWithError = EditWithErrorTemplate.bind({});
editWithError.storyName = 'Edit With Error';
editWithError.args = {};

export const customEdit = CustomEditTemplate.bind({});
customEdit.storyName = 'Custom Edit';
customEdit.args = {};
