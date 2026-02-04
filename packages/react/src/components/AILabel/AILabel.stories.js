/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { AILabel, AILabelContent, AILabelActions } from '.';
import { action } from 'storybook/actions';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { IconButton } from '../IconButton';
import mdx from './AILabel.mdx';
import './ailabel-story.scss';

export default {
  title: 'Components/AILabel',
  component: AILabel,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['AILabelContent', 'aiTextLabel', 'slugLabel'],
    },
  },
};
const sharedArgTypes = {
  aiText: {
    control: {
      type: 'text',
    },
  },
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
    control: { type: 'select' },
    description:
      'Specify how the `AILabelContent` should align with the trigger element.',
  },
  autoAlign: {
    control: {
      type: 'boolean',
    },
    description:
      'Will auto-align the `AILabelContent` on first render if it is not visible. This prop is currently experimental and is subject to future changes. Requires React v17+',
  },
  'aria-label': {
    control: {
      type: 'text',
    },
  },
  kind: {
    options: ['default', 'inline'],
    control: { type: 'select' },
  },
  revertActive: {
    control: {
      type: 'boolean',
    },
  },
  revertLabel: {
    control: {
      type: 'text',
    },
  },
  size: {
    options: ['mini', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'select' },
  },
  textLabel: {
    control: {
      type: 'text',
    },
  },
  defaultOpen: {
    control: {
      type: 'boolean',
    },
  },
  onRevertClick: {
    action: 'onRevertClick',
  },
};

const sharedArgs = {
  aiText: 'AI',
  ['aria-label']: 'Show information',
  kind: 'default',
  revertActive: false,
  revertLabel: 'Revert to AI input',
  size: 'md',
  defaultOpen: false,
  textLabel: '',
  autoAlign: true,
  onRevertClick: (event) => {
    action('onRevertClick')(event);
  },
};

export const Default = (args) => {
  const aiContent = (
    <div>
      <p className="secondary">AI Explained</p>
      <h2 className="ai-label-heading">84%</h2>
      <p className="secondary bold">Confidence score</p>
      <p className="secondary">
        Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
      </p>
      <hr />
      <p className="secondary">Model type</p>
      <p className="bold">Foundation model</p>
    </div>
  );

  return (
    <>
      <div className="ai-label-container ai-label-container-example">
        <AILabel {...args}>
          <AILabelContent>
            {aiContent}
            <AILabelActions>
              <IconButton kind="ghost" label="View">
                <View />
              </IconButton>
              <IconButton kind="ghost" label="Open Folder">
                <FolderOpen />
              </IconButton>
              <IconButton kind="ghost" label="Folders">
                <Folders />
              </IconButton>
              <Button>View details</Button>
            </AILabelActions>
          </AILabelContent>
        </AILabel>
      </div>
    </>
  );
};
Default.args = { ...sharedArgs };
Default.argTypes = { ...sharedArgTypes };
export const Inline = (args) => {
  const aiContent = (
    <div>
      <p className="secondary">AI Explained</p>
      <h2 className="ai-label-heading">84%</h2>
      <p className="secondary bold">Confidence score</p>
      <p className="secondary">
        Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
      </p>
      <hr />
      <p className="secondary">Model type</p>
      <p className="bold">Foundation model</p>
    </div>
  );

  return (
    <>
      <div className="ai-label-container ai-label-container-example">
        <AILabel {...args}>
          <AILabelContent>
            {aiContent}
            <AILabelActions>
              <IconButton kind="ghost" label="View">
                <View />
              </IconButton>
              <IconButton kind="ghost" label="Open Folder">
                <FolderOpen />
              </IconButton>
              <IconButton kind="ghost" label="Folders">
                <Folders />
              </IconButton>
              <Button>View details</Button>
            </AILabelActions>
          </AILabelContent>
        </AILabel>
      </div>
    </>
  );
};
Inline.args = {
  ...sharedArgs,
  kind: 'inline',
};
Inline.argTypes = { ...sharedArgTypes };
export const InlineWithContent = (args) => {
  const aiContent = (
    <div>
      <p className="secondary">AI Explained</p>
      <h2 className="ai-label-heading">84%</h2>
      <p className="secondary bold">Confidence score</p>
      <p className="secondary">
        Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
      </p>
      <hr />
      <p className="secondary">Model type</p>
      <p className="bold">Foundation model</p>
    </div>
  );

  return (
    <>
      <div className="ai-label-container ai-label-container-example">
        <AILabel {...args}>
          <AILabelContent>
            {aiContent}
            <AILabelActions>
              <IconButton kind="ghost" label="View">
                <View />
              </IconButton>
              <IconButton kind="ghost" label="Open Folder">
                <FolderOpen />
              </IconButton>
              <IconButton kind="ghost" label="Folders">
                <Folders />
              </IconButton>
              <Button>View details</Button>
            </AILabelActions>
          </AILabelContent>
        </AILabel>
      </div>
    </>
  );
};
InlineWithContent.args = {
  ...sharedArgs,
  kind: 'inline',
  textLabel: 'Text goes here',
};
InlineWithContent.argTypes = { ...sharedArgTypes };

export const ExplainabilityPopover = (args) => {
  const { showAILabelActions, ...rest } = args;
  return (
    <div className="ai-label-container-example ai-label-container centered">
      <AILabel {...rest}>
        <AILabelContent>
          {' '}
          <div>
            <p className="secondary">AI Explained</p>
            <h2 className="ai-label-heading">84%</h2>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p className="secondary">Model type</p>
            <p className="bold">Foundation model</p>
          </div>
          {showAILabelActions && (
            <AILabelActions>
              <IconButton kind="ghost" label="View">
                <View />
              </IconButton>
              <IconButton kind="ghost" label="Open Folder">
                <FolderOpen />
              </IconButton>
              <IconButton kind="ghost" label="Folders">
                <Folders />
              </IconButton>
              <Button>View details</Button>
            </AILabelActions>
          )}
        </AILabelContent>
      </AILabel>
    </div>
  );
};
ExplainabilityPopover.args = {
  ...sharedArgs,
  defaultOpen: true,
  autoAlign: false,
  showAILabelActions: true,
};

ExplainabilityPopover.argTypes = {
  ...sharedArgTypes,
  showAILabelActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
  },
};
