//
// Copyright IBM Corp. 2020, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';
import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { ArrowRight, Cloud, Add, Information } from '@carbon/react/icons';
import {
  AspectRatio,
  Column,
  Grid,
  usePrefix,
  AILabel,
  AILabelContent,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '@carbon/react';

import { ExpressiveCard } from '.';
import DocsPage from './ExpressiveCard.docs-page';
import { action } from 'storybook/actions';

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
  title: 'Components/Cards/ExpressiveCard',
  component: ExpressiveCard,
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
      options: [4, 8, 12, 16],
    },
    columnSizeMd: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    columnSizeLg: {
      control: {
        type: 'select',
      },
      options: [4, 8, 12, 16],
    },
    mediaRatio: {
      control: {
        type: 'select',
      },
      options: ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'],
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
  label: 'Label',
  title: 'Title',
  columnSizeSm: 4,
  columnSizeMd: 8,
  columnSizeLg: 4,
  children: (
    <p>
      expressive card body content block. description inviting the user to take
      action on the card.
    </p>
  ),
  primaryButtonText: 'Read more',
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
          <ExpressiveCard
            {...args}
            decorator={
              decorator && (decorator === 3 || sampleDecorator(decorator))
            }
          >
            {children}
          </ExpressiveCard>
        </Column>
      </Grid>
    </main>
  );
};

const MediaTemplate = (opts) => {
  const {
    children,
    columnSizeSm,
    columnSizeMd,
    columnSizeLg,
    mediaRatio = '1x1',
    decorator,
    ...args
  } = opts;
  return (
    <main>
      <Grid>
        <Column sm={columnSizeSm} md={columnSizeMd} lg={columnSizeLg}>
          <ExpressiveCard
            media={<AspectRatio ratio={mediaRatio}>{mediaRatio}</AspectRatio>}
            decorator={
              decorator && (decorator === 3 || sampleDecorator(decorator))
            }
            {...args}
          >
            {children}
          </ExpressiveCard>
        </Column>
      </Grid>
    </main>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  mediaRatio: null,
};

export const LabelOnly = Template.bind({});
LabelOnly.args = {
  ...defaultProps,
  title: '',
  mediaRatio: null,
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  ...defaultProps,
  description: 'Description or long caption',
  label: '',
  mediaRatio: null,
};

export const WithMedia = MediaTemplate.bind({});
WithMedia.args = {
  ...defaultProps,
};

export const WithActionIconButton = Template.bind({});
WithActionIconButton.args = {
  ...defaultProps,
  actionIcons: [
    {
      id: '1',
      icon: (props) => <ArrowRight size={18} {...props} />,
      iconDescription: 'Visit carbon official site',
      onClick: action('onClick'),
    },
  ],
  primaryButtonText: '',
  mediaRatio: null,
};

export const WithActionIconLink = Template.bind({});
WithActionIconLink.args = {
  ...defaultProps,
  actionIcons: [
    {
      id: '1',
      icon: (props) => <ArrowRight size={24} {...props} />,
      iconDescription: 'Visit carbon official site',
      link: {
        href: 'https://carbondesignsystem.com/',
        target: '_blank',
        rel: 'noreferrer noopener',
      },
    },
  ],
  primaryButtonText: '',
  mediaRatio: null,
};

export const WithPictogram = Template.bind({});
WithPictogram.args = {
  ...defaultProps,
  pictogram: (props) => <Cloud size={32} {...props} />,
  mediaRatio: null,
};

export const WithSecondaryAction = Template.bind({});
WithSecondaryAction.args = {
  ...defaultProps,
  secondaryButtonText: 'Remove',
  secondaryButtonKind: 'ghost',
  mediaRatio: null,
};

export const Clickable = Template.bind({});
Clickable.args = {
  ...defaultProps,
  onClick: action('on click'),
  onKeyDown: action('on keydown'),
  primaryButtonText: '',
  mediaRatio: null,
};

export const WithButtonHref = Template.bind({});
WithButtonHref.args = {
  ...defaultProps,
  primaryButtonHref: '#',
  secondaryButtonHref: '#',
  secondaryButtonText: 'Remove',
  secondaryButtonKind: 'ghost',
};

export const WithButtonIcon = Template.bind({});
WithButtonIcon.args = {
  ...defaultProps,
  primaryButtonIcon: (props) => <Add size={16} {...props} />,
};
