/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './AboutModal.mdx';
import { StandardAboutModal } from './example/preview-components/StandardAboutModal';
import { AboutModalWithAdditionalContent } from './example/preview-components/AboutModalWithAdditionalContent';

export default {
  title: 'Examples/About Modal',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const StandardTemplate = (args) => {
  return <StandardAboutModal {...args} />;
};

const WithAdditionalContentTemplate = (args) => {
  return <AboutModalWithAdditionalContent {...args} />;
};

export const Standard = StandardTemplate.bind({});
Standard.args = {};

export const WithAdditionalContent = WithAdditionalContentTemplate.bind({});
WithAdditionalContent.args = {};
