/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';
import { Information } from '@carbon/react/icons';
import { pkg } from '../../settings';
import { TruncatedText } from '../TruncatedText';

import {
  Button,
  Form,
  FormGroup,
  TextInput,
  AILabel,
  AILabelContent,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '@carbon/react';

import { TearsheetNarrow, deprecatedProps } from './TearsheetNarrow';

import {
  actionsOptions,
  actionsLabels,
  actionsMapping,
} from '../ActionSet/actions.js';

import { getDeprecatedArgTypes } from '../../global/js/utils/props-helper';
import styles from './_storybook-styles.scss?inline';

// import mdx from './Tearsheet.mdx';

export default {
  title: 'Components/Tearsheet/TearsheetNarrow',
  component: TearsheetNarrow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', styles /* docs: { page: mdx } */ },
  argTypes: {
    ...getDeprecatedArgTypes(deprecatedProps),
    actions: {
      control: { type: 'select', labels: actionsLabels },
      options: actionsOptions,
      mapping: actionsMapping(
        {
          primary: 'Create',
          secondary: 'Close',
          secondary2: 'Save',
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
        0: 'This is a description for the tearsheet, providing an opportunity to describe the flow.',
        1: (
          <TruncatedText
            lines={1}
            tooltipDirection="bottom"
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          />
        ),
        2: (
          <TruncatedText
            lines={2}
            tooltipDirection="bottom"
            value="This is a description for the tearsheet, providing an opportunity to describe the flow over a couple of lines in the header of the tearsheet."
          />
        ),
      },
    },
    label: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    onClose: { control: { disable: true } },
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
      description: 'deprecated Property replaced by "decorator"',
      options: [0, 1],
    },
  },
};

// Test values for props.

const closeIconDescription = 'Close the tearsheet';

const label = 'The label of the tearsheet';

const mainContent = (
  <div className="tearsheet-stories__narrow-content-block">
    <Form>
      <p>Main content</p>
      <FormGroup
        legendId="tearsheetNarrow-form-group"
        legendText="FormGroup Legend"
      >
        <TextInput id="tss-ft1" labelText="Enter an important value here" />
      </FormGroup>
    </Form>
  </div>
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

// Template.
// eslint-disable-next-line react/prop-types
const Template = ({ actions, decorator, slug, ...args }, context) => {
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const ref = useRef(undefined);

  const wiredActions = Array.prototype.map.call(actions, (action) => {
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
      <div ref={ref}>
        <TearsheetNarrow
          {...args}
          actions={wiredActions}
          open={open}
          onClose={() => setOpen(false)}
          decorator={decorator && sampleDecorator(decorator)}
          slug={slug && sampleDecorator(slug)}
        >
          {mainContent}
        </TearsheetNarrow>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const StackedTemplate = ({ actions, decorator, slug, ...args }, context) => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const ref = useRef(undefined);

  useEffect(() => {
    setOpen1(context.viewMode !== 'docs');
    setOpen2(context.viewMode !== 'docs');
    setOpen3(context.viewMode !== 'docs');
  }, []);

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

  return (
    <>
      <style>{`.${pkg.prefix}--tearsheet { opacity: 0 }`};</style>
      <div style={{ height: '3rem' }} data-reserve-space="for toggle buttons" />
      <main
        style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10000,
        }}
      >
        <Button onClick={() => setOpen1(!open1)}>Toggle #1</Button>
        <Button onClick={() => setOpen2(!open2)}>Toggle #2</Button>
        <Button onClick={() => setOpen3(!open3)}>Toggle #3</Button>
      </main>
      <div ref={ref}>
        <TearsheetNarrow
          {...args}
          actions={wiredActions1}
          title="Tearsheet #1"
          open={open1}
          onClose={() => setOpen1(false)}
          decorator={decorator && sampleDecorator(decorator)}
          slug={slug && sampleDecorator(slug)}
        >
          <div className="tearsheet-stories__narrow-content-block">
            Main content 1
          </div>
        </TearsheetNarrow>
        <TearsheetNarrow
          {...args}
          actions={wiredActions2}
          title="Tearsheet #2"
          open={open2}
          onClose={() => setOpen2(false)}
          decorator={decorator && sampleDecorator(decorator)}
          slug={slug && sampleDecorator(slug)}
          selectorPrimaryFocus="#main-content"
        >
          <div className="tearsheet-stories__narrow-content-block">
            Main content 2
          </div>
        </TearsheetNarrow>
        <TearsheetNarrow
          {...args}
          actions={wiredActions3}
          title="Tearsheet #3"
          open={open3}
          onClose={() => setOpen3(false)}
          decorator={decorator && sampleDecorator(decorator)}
          slug={slug && sampleDecorator(slug)}
          selectorPrimaryFocus="#main-content"
        >
          <div className="tearsheet-stories__narrow-content-block">
            Main content 3
          </div>
        </TearsheetNarrow>
      </div>
    </>
  );
};

// Stories
export const tearsheetNarrow = Template.bind({});
tearsheetNarrow.storyName = 'Narrow tearsheet';
tearsheetNarrow.args = {
  closeIconDescription,
  description: 0,
  onClose: action('onClose called'),
  title,
  actions: 7,
};

export const fullyLoaded = Template.bind({});
fullyLoaded.storyName = 'Narrow tearsheet with all header items';
fullyLoaded.args = {
  closeIconDescription,
  description: 0,
  hasCloseIcon: true,
  label,
  onClose: action('onClose called'),
  title,
  actions: 0,
  decorator: 1,
  slug: 0,
};

export const stacked = StackedTemplate.bind({});
stacked.storyName = 'Stacking narrow tearsheets';
stacked.args = {
  closeIconDescription,
  description: 0,
  height: 'lower',
  label,
  actions: 7,
};
