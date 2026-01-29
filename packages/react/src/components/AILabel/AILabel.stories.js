/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { AILabel, AILabelContent, AILabelActions } from '.';
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
  },
};
const sharedArgTypes = {
  aiText: {
    control: {
      type: 'text',
    },
  },
  aiTextLabel: {
    table: { disable: true },
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
  slugLabel: {
    table: { disable: true },
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
};

const sharedArgs = {
  aiText: 'AI',
  ['aria-label']: 'Show information',
  kind: 'default',
  revertActive: false,
  revertLabel: 'Revert to AI input',
  defaultOpen: false,
};

export const Default = (args) => {
  const {
    aiText,
    'aria-label': ariaLabel,
    kind,
    revertActive,
    revertLabel,
    size,
    textLabel,
  } = args;
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          autoAlign
          size={size || 'mini'}
          textLabel={textLabel}>
          <AILabelContent>{aiContent}</AILabelContent>
        </AILabel>
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          autoAlign
          size={size || '2xs'}
          textLabel={textLabel}>
          <AILabelContent>{aiContent}</AILabelContent>
        </AILabel>
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          size={size || 'xs'}
          textLabel={textLabel}>
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          autoAlign
          size={size || 'sm'}
          textLabel={textLabel}>
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          size={size || 'md'}
          textLabel={textLabel}>
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          autoAlign
          size={size || 'lg'}
          textLabel={textLabel}>
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          kind={kind}
          revertActive={revertActive}
          revertLabel={revertLabel}
          autoAlign
          size={size || 'xl'}
          textLabel={textLabel}>
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
      <div className="ai-label-container ai-label-container-example">
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind="inline"
          size="sm">
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind="inline"
          size="md">
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind="inline"
          size="lg">
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
      <div className="ai-label-container ai-label-container-example">
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind="inline"
          size="sm"
          textLabel="Text goes here">
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind="inline"
          size="md"
          textLabel="Text goes here">
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
        <AILabel
          aiText={aiText}
          aria-label={ariaLabel}
          autoAlign
          kind="inline"
          size="lg"
          textLabel="Text goes here">
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

export const ExplainabilityPopover = (args) => {
  const { showAILabelActions = true } = args;

  return (
    <div className="ai-label-container-example ai-label-container centered">
      <AILabel autoAlign={false} defaultOpen {...args}>
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

ExplainabilityPopover.argTypes = {
  showAILabelActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
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
  },
};

ExplainabilityPopover.parameters = {
  controls: {
    include: ['align', 'aria-label', 'defaultOpen', 'showAILabelActions'],
  },
};
