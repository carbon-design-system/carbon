//
// Copyright IBM Corp. 2020, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { TrashCan, Edit, Information, ArrowRight } from '@carbon/react/icons';
import {
  Grid,
  Column,
  usePrefix,
  AILabel,
  AILabelContent,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '@carbon/react';
import { ProductiveCard } from '.';
import DocsPage from './ProductiveCard.docs-page';
import { action } from 'storybook/actions';

const storyClass = 'productive-card-stories';

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

export default {
  title: 'Components/Cards/ProductiveCard',
  component: ProductiveCard,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
    columnSizeSm: {
      control: {
        type: 'select',
      },
      options: [1, 2, 3, 4],
    },
    columnSizeMd: {
      control: {
        type: 'select',
      },
      options: [2, 4, 6, 8],
    },
    columnSizeLg: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    slug: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI slug',
          1: 'with AI Slug',
        },
        default: 0,
      },
      options: [false, true],
    },
    decorator: {
      control: {
        type: 'select',
        labels: {
          0: 'No AI label',
          1: 'with AI label',
          2: 'With non AI Label component',
          3: 'with hollow AI label (boolean)',
        },
        default: 0,
      },
      options: [0, 1, 2, 3],
    },
  },
  decorators: [
    (Story) => {
      const carbonPrefix = usePrefix();
      return (
        <div className={`${carbonPrefix}--grid card-story`}>{Story()}</div>
      );
    },
  ],
};

const defaultProps = {
  title: 'Title',
  columnSizeSm: 4,
  columnSizeMd: 8,
  columnSizeLg: 8,
  children: (
    <>
      <div className={`${storyClass}__graph`}>
        <span className={`${storyClass}__visually-hidden`}>
          graph showing progress
        </span>
      </div>
      <p>Productive content text</p>
      <p>Productive content text</p>
    </>
  ),
  actionIcons: [
    {
      id: '1',
      'data-testid': 'test-id-1',
      icon: (props) => <Edit size={16} {...props} />,
      onClick: action('on click'),
      iconDescription: 'Edit',
    },
    {
      id: '2',
      'data-testid': 'test-id-2',
      icon: (props) => <TrashCan size={16} {...props} />,
      onClick: action('on click'),
      iconDescription: 'Delete',
    },
  ],
};

const Template = (opts) => {
  const {
    children,
    columnSizeSm,
    columnSizeMd,
    columnSizeLg,
    decorator,
    ...args
  } = opts;
  return (
    <main>
      <Grid>
        <Column sm={columnSizeSm} md={columnSizeMd} lg={columnSizeLg}>
          <ProductiveCard
            {...args}
            decorator={
              decorator && (decorator === 3 || sampleDecorator(decorator))
            }
          >
            {children}
          </ProductiveCard>
        </Column>
      </Grid>
    </main>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  ...defaultProps,
  description: 'caption',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...defaultProps,
  label: 'Label',
};

export const LabelOnly = Template.bind({});
LabelOnly.args = {
  ...defaultProps,
  title: '',
  label: 'Label',
  actionsPlacement: 'bottom',
  primaryButtonText: 'Read more',
};

export const WithOverflow = Template.bind({});
WithOverflow.args = {
  ...defaultProps,
  iconDescription: 'Option',
  overflowAriaLabel: 'Overflow menu',
  overflowActions: [
    {
      id: '1',
      itemText: 'Edit',
      onClick: () => {
        action('click');
      },
      onKeyDown: () => {
        action('keydown');
      },
    },
    {
      id: '2',
      itemText: 'Delete',
      onClick: () => {
        action('click');
      },
      onKeyDown: () => {
        action('keydown');
      },
    },
  ],
};

export const SupplementalBottomBar = Template.bind({});
SupplementalBottomBar.args = {
  ...defaultProps,
  primaryButtonText: 'Read more',
};

export const ComplexBottomBar = Template.bind({});
ComplexBottomBar.args = {
  ...defaultProps,
  primaryButtonText: 'Read more',
  actionsPlacement: 'bottom',
  title: '',
  label: 'Label',
};

export const Clickable = Template.bind({});
Clickable.args = {
  ...defaultProps,
  onClick: action('on click'),
  onKeyDown: action('on keydown'),
  primaryButtonText: 'Read more',
  clickZone: 'two',
  actionIcons: [],
};

export const WithButtonHref = Template.bind({});
WithButtonHref.args = {
  ...defaultProps,
  primaryButtonText: 'Read more',
  primaryButtonHref: '#',
};

export const WithActionGhostButton = Template.bind({});
WithActionGhostButton.args = {
  ...defaultProps,
  primaryButtonPlacement: 'top',
  primaryButtonText: 'Read more',
  primaryButtonIcon: (props) => <TrashCan size={16} {...props} />,
  primaryButtonDisabled: true,
};

export const WithActionIconLink = Template.bind({});
WithActionIconLink.args = {
  ...defaultProps,
  actionIcons: [
    {
      id: '1',
      icon: (props) => <ArrowRight size={18} {...props} />,
      iconDescription: 'Visit carbon official site',
      link: {
        href: 'https://carbondesignsystem.com/',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
    },
  ],
};
