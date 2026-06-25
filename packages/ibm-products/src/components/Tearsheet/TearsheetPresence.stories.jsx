/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';
import { Information } from '@carbon/react/icons';
import { pkg } from '../../settings';
import { TruncatedText } from '../TruncatedText';
import {
  Button,
  ButtonSet,
  Dropdown,
  Form,
  FormGroup,
  Heading,
  Section,
  TextInput,
  AILabel,
  AILabelContent,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '@carbon/react';

import { Tearsheet, deprecatedProps } from './Tearsheet';
import {
  actionsOptions,
  actionsLabels,
  actionsMapping,
} from '../ActionSet/actions.js';

import { getDeprecatedArgTypes } from '../../global/js/utils/props-helper';
import styles from './_storybook-styles.scss?inline';
import { TearsheetNarrow } from './TearsheetNarrow';
import { TearsheetPresence } from './TearsheetPresence';
import DocsPage from './TearsheetPresence.docs-page';

export default {
  title: 'Components/Tearsheet/Feature Flags/Presence',
  component: Tearsheet,
  tags: ['autodocs'],
  parameters: {
    styles,
    layout: 'fullscreen',
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    ...getDeprecatedArgTypes(deprecatedProps),
    actions: {
      control: { type: 'select', labels: actionsLabels },
      options: actionsOptions,
      mapping: actionsMapping(
        {
          primary: 'Replace',
          danger: 'Delete',
          secondary: 'Back',
          secondary2: 'Keep Both',
          dangerGhost: 'Abort',
          ghost: 'Cancel',
        },
        action
      ),
    },
    description: {
      control: {
        type: 'select',
        labels: {
          0: 'With plain String',
          1: 'With TruncatedText and 1 line',
          2: 'With TruncatedText and 2 lines',
        },
        default: 0,
      },
      description:
        'A description of the flow, displayed in the header area of the tearsheet.\n Note: `TruncatedText` can be passed as a React node to apply custom text formatting, including ellipsis truncation and a definition tooltip when the content is too long.',
      options: [0, 1, 2],
      mapping: {
        0: 'This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet.',
        1: (
          <TruncatedText
            autoAlign
            lines={1}
            tooltipDirection="bottom"
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          />
        ),
        2: (
          <TruncatedText
            autoAlign
            lines={2}
            tooltipDirection="bottom"
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          />
        ),
      },
    },
    headerActions: {
      control: {
        type: 'select',
        labels: {
          0: 'none',
          1: 'drop-down',
          2: 'buttons',
        },
      },
      options: [0, 1, 2],
      mapping: {
        0: null,
        1: (
          <Dropdown
            id="tss-had"
            label="Choose an option"
            titleText="Choose an option"
            items={['option 1', 'option 2', 'option 3', 'option 4']}
          />
        ),
        2: (
          <ButtonSet>
            <Button kind="secondary" size="sm" style={{ width: 'initial' }}>
              Secondary
            </Button>
            <Button kind="primary" size="sm" style={{ width: 'initial' }}>
              Primary
            </Button>
          </ButtonSet>
        ),
      },
    },
    label: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    influencer: { control: { disable: true } },
    onClose: { control: { disable: true } },
    navigation: { control: { disable: true } },
    open: { control: { disable: true } },
    portalTarget: { control: { disable: true } },
    decorator: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI Label',
          1: 'with AI Label',
          2: 'With non AI Label component',
        },
        default: 0,
      },
      description: 'Optional prop that allows you to pass any component.',
      options: [0, 1, 2],
    },
    slug: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI Slug',
          1: 'with AI Slug',
        },
        default: 0,
      },
      description: 'Deprecated: Property replaced by "decorator"',
      options: [0, 1],
    },
  },
};

// Test values for props.

const closeIconDescription = 'Close the tearsheet';

const influencer = (
  <Section className="tearsheet-stories__dummy-content-block">
    <Heading>Influencer heading</Heading>
    <p>Influencer content</p>
  </Section>
);

const label = 'The label of the tearsheet';

const mainContent = (
  <Section className="tearsheet-stories__dummy-content-block">
    <Heading>Main content heading</Heading>
    <Form>
      <p>Main content</p>
      <FormGroup legendId="tearsheet-form-group" legendText="FormGroup Legend">
        <TextInput
          id="tss-ft1"
          labelText="Enter an important value here"
          style={
            // stylelint-disable-next-line carbon/layout-use
            { marginBottom: '1em' }
          }
        />
        <TextInput
          id="tss-ft2"
          labelText="Here is an entry field:"
          style={
            // stylelint-disable-next-line carbon/layout-use
            { marginBottom: '1em' }
          }
        />
      </FormGroup>
    </Form>
  </Section>
);

const title = 'Title of the tearsheet';

const sampleDecorator = (decorator) => {
  switch (decorator) {
    case 1:
      return (
        <AILabel className="decorator-container" size="xs">
          <AILabelContent>
            <div>
              <p className="secondary">AI Explained</p>
              <h1>84%</h1>
              <p className="secondary bold">Confidence score</p>
              <p className="secondary">
                This is not really Lorem Ipsum but the spell checker did not
                like the previous text with it&apos;s non-words which is why
                this unwieldy sentence, should one choose to call it that, here.
              </p>
              <hr />
              <p className="secondary">Model type</p>
              <p className="bold">Foundation model</p>
            </div>
          </AILabelContent>
        </AILabel>
      );
    case 2:
      return (
        <Toggletip>
          <ToggletipButton label="Additional information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p>Custom content here</p>
          </ToggletipContent>
        </Toggletip>
      );
    default:
      return;
  }
};

// eslint-disable-next-line react/prop-types
const Template = ({ decorator, slug, actions, ...args }) => {
  const [open, setOpen] = useState(false);

  const wiredActions =
    actions &&
    Array.prototype.map.call(actions, (action) => {
      if (action.label === 'Cancel') {
        const previousClick = action.onClick;
        return {
          ...action,
          onClick: (evt) => {
            setOpen(false);
            previousClick(evt);
          },
        };
      }
      return action;
    });

  return (
    <>
      <style>{`.${pkg.prefix}--tearsheet { opacity: 0 }`};</style>
      <main>
        <Button onClick={() => setOpen(true)}>Open Tearsheet</Button>
      </main>
      <TearsheetPresence open={open}>
        <Tearsheet
          {...args}
          actions={wiredActions}
          onClose={() => setOpen(false)}
          decorator={decorator && sampleDecorator(decorator)}
          slug={slug && sampleDecorator(slug)}
        >
          {mainContent}
        </Tearsheet>
      </TearsheetPresence>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Narrow = ({ decorator, slug, actions, ...args }) => {
  const [open, setOpen] = useState(false);

  const wiredActions =
    actions &&
    Array.prototype.map.call(actions, (action) => {
      if (action.label === 'Cancel') {
        const previousClick = action.onClick;
        return {
          ...action,
          onClick: (evt) => {
            setOpen(false);
            previousClick(evt);
          },
        };
      }
      return action;
    });

  return (
    <>
      <style>{`.${pkg.prefix}--tearsheet { opacity: 0 }`};</style>
      <main>
        <Button onClick={() => setOpen(true)}>Open Tearsheet</Button>
      </main>
      <TearsheetPresence open={open}>
        <TearsheetNarrow
          {...args}
          actions={wiredActions}
          onClose={() => setOpen(false)}
          decorator={decorator && sampleDecorator(decorator)}
          slug={slug && sampleDecorator(slug)}
        >
          {mainContent}
        </TearsheetNarrow>
      </TearsheetPresence>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const StackedTemplate = (
  { actions, decorator, description, slug, ...args },
  context
) => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const ref = useRef(undefined);
  const openButton1 = useRef(undefined);
  const openButton2 = useRef(undefined);
  const openButton3 = useRef(undefined);

  const description1 = cloneElement(description, { id: 'truncated-text-01' });
  const description2 = cloneElement(description, { id: 'truncated-text-02' });
  const description3 = cloneElement(description, { id: 'truncated-text-03' });

  const wiredActions1 = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen1(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  const wiredActions2 = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen2(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  const wiredActions3 = Array.prototype.map.call(actions, (action) => {
    if (action.label === 'Cancel') {
      const previousClick = action.onClick;
      return {
        ...action,
        onClick: (evt) => {
          setOpen3(false);
          previousClick(evt);
        },
      };
    }
    return action;
  });

  useEffect(() => {
    setTimeout(() => {
      setOpen1(context.viewMode !== 'docs');
      setOpen2(context.viewMode !== 'docs');
      setOpen3(context.viewMode !== 'docs');
    }, 0);
  }, []);

  return (
    <>
      <style>{`.${pkg.prefix}--tearsheet { opacity: 0 }`};</style>
      <div style={{ height: '3rem' }} data-reserve-space="for toggle buttons" />
      <main>
        <ButtonSet
          style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10000,
          }}
        >
          <Button onClick={() => setOpen1(!open1)} ref={openButton1}>
            Toggle&nbsp;tearsheet&nbsp;1
          </Button>
          <Button onClick={() => setOpen2(!open2)}>
            Toggle&nbsp;tearsheet&nbsp;2
          </Button>
          <Button onClick={() => setOpen3(!open3)}>
            Toggle&nbsp;tearsheet&nbsp;3
          </Button>
        </ButtonSet>
      </main>
      <div ref={ref}>
        <TearsheetPresence open={open1}>
          <Tearsheet
            {...args}
            description={description1}
            actions={wiredActions1}
            headerActions={
              <ButtonSet>
                <Button
                  kind="primary"
                  size="sm"
                  style={{ width: 'initial' }}
                  onClick={() => setOpen2(true)}
                  disabled={open2}
                  ref={openButton2}
                >
                  Open tearsheet 2
                </Button>
              </ButtonSet>
            }
            title="Tearsheet 1"
            onClose={() => setOpen1(false)}
            selectorPrimaryFocus="#stacked-input-1"
            decorator={decorator && sampleDecorator(decorator)}
            slug={slug && sampleDecorator(slug)}
            launcherButtonRef={openButton1}
          >
            <div className="tearsheet-stories__dummy-content-block">
              Main content 1
              <TextInput
                id="stacked-input-1"
                labelText="Enter an important value here"
              />
            </div>
          </Tearsheet>
        </TearsheetPresence>
        <TearsheetPresence open={open2}>
          <Tearsheet
            {...args}
            description={description2}
            actions={wiredActions2}
            headerActions={
              <ButtonSet>
                <Button
                  kind="primary"
                  size="sm"
                  style={{ width: 'initial' }}
                  onClick={() => setOpen3(true)}
                  disabled={open3}
                  ref={openButton3}
                >
                  Open tearsheet 3
                </Button>
              </ButtonSet>
            }
            title="Tearsheet 2"
            onClose={() => setOpen2(false)}
            selectorPrimaryFocus="#stacked-input-2"
            decorator={decorator && sampleDecorator(decorator)}
            slug={slug && sampleDecorator(slug)}
            launcherButtonRef={openButton2}
          >
            <div className="tearsheet-stories__dummy-content-block">
              Main content 2
              <TextInput
                id="stacked-input-2"
                labelText="Enter an important value here"
              />
            </div>
          </Tearsheet>
        </TearsheetPresence>
        <TearsheetPresence open={open3}>
          <Tearsheet
            {...args}
            description={description3}
            actions={wiredActions3}
            title="Tearsheet 3"
            onClose={() => setOpen3(false)}
            selectorPrimaryFocus="#stacked-input-3"
            decorator={decorator && sampleDecorator(decorator)}
            slug={slug && sampleDecorator(slug)}
            launcherButtonRef={openButton3}
          >
            <div className="tearsheet-stories__dummy-content-block">
              Main content 3
              <TextInput
                id="stacked-input-3"
                labelText="Enter an important value here"
              />
            </div>
          </Tearsheet>
        </TearsheetPresence>
      </div>
    </>
  );
};

// Stories
export const tearsheet = Template.bind({});
tearsheet.storyName = 'Tearsheet';
tearsheet.args = {
  closeIconDescription,
  description: 2,
  onClose: action('onClose called'),
  title,
  actions: 7,
};

// Stories
export const narrow = Narrow.bind({});
narrow.storyName = 'Narrow';
narrow.args = {
  closeIconDescription,
  description: 2,
  onClose: action('onClose called'),
  title,
  actions: 7,
};

// eslint-disable-next-line react/prop-types
export const stacked = StackedTemplate.bind({});
stacked.storyName = 'Stacking tearsheets';
stacked.args = {
  closeIconDescription,
  description: 2,
  height: 'lower',
  influencer,
  label,
  actions: 7,
};
