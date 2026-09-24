/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './ImportAndUpload.mdx';
import { StandardImportAndUpload } from './example/preview-components/StandardImportAndUpload';

export default {
  title: 'Examples/Import and upload',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const StandardTemplate = (args) => {
  return <StandardImportAndUpload {...args} />;
};

export const Standard = StandardTemplate.bind({});
Standard.storyName = 'Import and Upload';
Standard.args = {};
