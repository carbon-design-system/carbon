/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './ExportModal.mdx';
import { StandardExportModal } from './example/preview-components/StandardExportModal';
import { ExportModalWithExtensionValidation } from './example/preview-components/ExportModalWithExtensionValidation';
import { ExportModalWithPreformattedExtensions } from './example/preview-components/ExportModalWithPreformattedExtensions';

export default {
  title: 'Examples/ExportModal',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const StandardTemplate = (args) => {
  return <StandardExportModal {...args} />;
};

const WithExtensionValidationTemplate = (args) => {
  return <ExportModalWithExtensionValidation {...args} />;
};

const WithPreformattedExtensionsTemplate = (args) => {
  return <ExportModalWithPreformattedExtensions {...args} />;
};

export const Standard = StandardTemplate.bind({});
Standard.storyName = 'Standard';
Standard.args = {};

export const WithExtensionValidation = WithExtensionValidationTemplate.bind({});
WithExtensionValidation.storyName = 'With extension validation';
WithExtensionValidation.args = {};

export const WithPreformattedExtensions =
  WithPreformattedExtensionsTemplate.bind({});
WithPreformattedExtensions.storyName = 'With preformatted extensions';
WithPreformattedExtensions.args = {};
