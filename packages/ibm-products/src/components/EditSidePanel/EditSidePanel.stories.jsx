/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import {
  Button,
  Grid,
  Column,
  TextInput,
  NumberInput,
  Dropdown,
  Header,
  HeaderContainer,
  HeaderName,
  usePrefix,
  unstable__Slug as Slug,
  unstable__SlugContent as SlugContent,
} from '@carbon/react';
import { Copy, TrashCan, Settings } from '@carbon/react/icons';
import { EditSidePanel } from '.';

import styles from './_storybook-styles.scss?inline';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import { sidePanelDecorator } from '../../global/decorators/sidePanelDecorator';
import { Annotation } from '../../../.storybook/Annotation';

const sampleSlug = (
  <Slug className="slug-container" size="xs">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          This is not really Lorem Ipsum but the spell checker did not like the
          previous text with it&apos;s non-words which is why this unwieldy
          sentence, should one choose to call it that, here.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
    </SlugContent>
  </Slug>
);

const defaultStoryProps = {
  title: 'Edit platform quotas',
  subtitle: 'Specify the details of the quotas',
  formTitle: 'Core configuration',
  formDescription:
    'We recommend you fill out and evaluate these details at a minimum before deploying your topic.',
  primaryButtonText: 'Save',
  secondaryButtonText: 'Cancel',
};

const renderUIShellHeader = () => (
  <HeaderContainer
    render={() => (
      <Header>
        <HeaderName href="/" prefix="IBM">
          Cloud Pak
        </HeaderName>
      </Header>
    )}
  />
);

const prefix = 'edit-side-panel-stories__';

export default {
  title: 'Deprecated/Edit and update/EditSidePanel',
  component: EditSidePanel,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  argTypes: {
    title: { control: { type: 'text' } },
    subtitle: { control: { type: 'text' } },
    formTitle: { control: { type: 'text' } },
    formDescription: { control: { type: 'text' } },
    open: { control: { disable: true } },
    slug: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI slug',
          1: 'with AI Slug',
        },
        default: 0,
      },
      options: [0, 1],
    },
  },
  parameters: {
    layout: 'fullscreen',
    styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: () => (
        <StoryDocsPage altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/edit-and-update/usage/#side-panel-edit" />
      ),
    },
  },
  decorators: [
    (story) => (
      <Grid id="ibm-products-page-content" className="story-content">
        <Column sm={{ span: 4 }} md={{ span: 6 }}>
          <Annotation
            type="deprecation-notice"
            text={
              <div>
                This component is deprecated and will be removed in the next
                major version.
              </div>
            }
          >
            {story()}
          </Annotation>
        </Column>
      </Grid>
    ),
    sidePanelDecorator(renderUIShellHeader, prefix),
  ],
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = ({ slug, ...args }) => {
  const carbonPrefix = usePrefix();
  const items = ['Day(s)', 'Month(s)', 'Year(s)'];
  const [open, setOpen] = useState(false);
  const [topicValue, setTopicValue] = useState('Cluster management');
  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Close side panel' : 'Open side panel'}
      </Button>
      <EditSidePanel
        {...args}
        id="storybook-id"
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        disableSubmit={!topicValue.length}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
        slug={slug && sampleSlug}
      >
        <TextInput
          id="create-side-panel-topic-name-a"
          labelText="Topic name"
          className={`${prefix}form-item`}
          placeholder="Enter topic name"
          value={topicValue}
          onChange={(event) => setTopicValue(event.target.value)}
        />
        <NumberInput
          iconDescription="Choose a number"
          id="1"
          className={`${prefix}form-item`}
          label="Partitions"
          min={0}
          max={50}
          value={1}
        />
        <NumberInput
          iconDescription="Choose a number"
          id="2"
          className={`${prefix}form-item`}
          label="Replicas"
          min={0}
          max={50}
          value={1}
        />
        <NumberInput
          iconDescription="Choose a number"
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
        />
        <div
          style={{
            display: 'grid',
            alignItems: 'flex-end',
            gridGap: '0.75rem',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <NumberInput
            iconDescription="Choose a number"
            id="4"
            className={`${prefix}form-item`}
            label="Retention time"
            min={0}
            max={50}
            value={30}
          />
          <Dropdown
            id="create-side-panel-dropdown-options-a"
            items={items}
            initialSelectedItem="Day(s)"
            label="Options"
            titleText="Options"
            className={`${prefix}form-item`}
          />
        </div>
        <NumberInput
          iconDescription="Choose a number"
          id="5"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
        />
      </EditSidePanel>
    </>
  );
};

/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */

export const editSidePanel = Template.bind({});
editSidePanel.args = {
  actionToolbarButtons: [
    {
      label: 'Copy platform id',
      icon: (props) => <Copy size={16} {...props} />,
      onClick: action('Toolbar button clicked: Copy'),
      hasIconOnly: true,
    },
    {
      label: 'Settings',
      icon: (props) => <Settings size={16} {...props} />,
      onClick: action('Toolbar button clicked: Settings'),
      hasIconOnly: true,
    },
    {
      label: 'Delete',
      icon: (props) => <TrashCan size={16} {...props} />,
      onClick: action('Toolbar button clicked: Delete'),
      hasIconOnly: true,
    },
  ],
  includeOverlay: true,
  ...defaultStoryProps,
};
