/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import FormDemo from './stories/form-demo';
import '../AILabel/ailabel-story.scss';

import mdx from './Form.mdx';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  // ── Shared controls inherited by every story ──────────────────────────────
  args: {
    className: 'some-class',
    skeleton: false,
    aiLabel: false,
    revertActive: false,
    showInModal: false,
    disabled: false,
    readOnly: false,
    invalid: false,
    invalidText: 'Error message.',
    warn: false,
    warnText: 'Warning message.',
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Specify a custom className to be applied to the form',
    },
    onSubmit: {
      action: 'onSubmit',
    },
    skeleton: {
      control: { type: 'boolean' },
      description: 'Render all form inputs as skeleton loaders simultaneously',
    },
    aiLabel: {
      control: { type: 'boolean' },
      description: 'Attach an AI Label decorator to all inputs that support it',
      table: { category: 'AILabel' },
    },
    revertActive: {
      control: { type: 'boolean' },
      table: { category: 'AILabel' },
    },
    showInModal: {
      control: { type: 'boolean' },
      description:
        'Render the entire form inside a ComposedModal with a trigger button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs should be disabled',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs should be read-only',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs are in an invalid state',
    },
    invalidText: {
      control: { type: 'text' },
      description: 'Provide the text for the invalid state',
    },
    warn: {
      control: { type: 'boolean' },
      description: 'Specify whether the form inputs should display a warning',
    },
    warnText: {
      control: { type: 'text' },
      description: 'Provide the text for the warning state',
    },
  },
};

export const Default = (args) => {
  return <FormDemo {...args} />;
};

// Story-specific args — shared controls come from the export default above
Default.args = {
  size: 'md',
  showInModal: false,
};

Default.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

Default.argTypes = {
  showInModal: {
    control: { type: 'boolean' },
    description:
      'Render the entire form inside a ComposedModal with a trigger button',
  },
  size: {
    control: { type: 'select' },
    options: ['xs', 'sm', 'md', 'lg'],
    description:
      'Size of all form inputs. xs is supported by TextInput, Select and Search; other components clamp to sm.',
  },
};

export const withAILabel = (args) => {
  return <FormDemo {...args} size="md" aiLabel />;
};

withAILabel.args = {
  aiLabel: true,
};

withAILabel.storyName = 'With AI Label';

withAILabel.argTypes = {
  size: {
    table: { disable: true },
  },
};
