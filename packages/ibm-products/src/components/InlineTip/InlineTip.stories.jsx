/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import cx from 'classnames';
import {
  previewCandidate__InlineTip as InlineTip,
  previewCandidate__InlineTipButton as InlineTipButton,
  previewCandidate__InlineTipLink as InlineTipLink,
} from '..';
import mdx from './InlineTip.mdx';

import styles from './_storybook-styles.scss?inline';
import InlineTipImage from './storybook_assets/inline-tip-image.png';

export default {
  title: 'Preview Candidate/Onboarding/InlineTip',
  component: InlineTip,
  tags: ['autodocs', 'Onboarding'],
  parameters: {
    styles,
    layout: 'padded',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    action: {
      options: ['None', '<InlineTipButton>', '<InlineTipLink>'],
      control: { type: 'radio' },
    },
    renderMedia: {
      options: ['None', 'Render a static image'],
      control: { type: 'radio' },
    },
    narrow: {
      control: { type: null },
    },
  },
};

const defaultProps = {
  children: (
    // 'Use case-specific content that explains the concept or adds context. Use case-specific content that explains the concept or adds context. Use case-specific content that explains the concept or adds context.',
    <ul>
      <li>
        Use <b>case-specific</b> content that explains the concept or adds
        context.
      </li>
      <li>
        Use case-specific <i>content that</i> explains the concept or adds
        context.
      </li>
      <li>
        Use case-specific content that explains the concept or adds context.
      </li>
    </ul>
  ),
  closeIconDescription: 'Close',
  collapseButtonLabel: 'Read less',
  collapsible: false,
  action: 'None',
  expandButtonLabel: 'Read more',
  renderMedia: 'None',
  onClick: () => {
    action(`Clicked the tertiary button`)();
  },
  onClose: () => {
    action(`Clicked the close button`)();
  },
  title: 'Use case-specific heading',
  withLeftGutter: false,
};

const Template = (args) => {
  const { renderMedia, narrow, action: componentAction } = args;

  const selectedMedia = (function () {
    switch (renderMedia) {
      case 'Render a static image':
        return () => <img alt="" src={InlineTipImage} />;

      default:
        return null;
    }
  })();
  const selectedAction = (function () {
    switch (componentAction) {
      case '<InlineTipButton>':
        return (
          <InlineTipButton
            onClick={() => {
              action(`Clicked the action button`)();
            }}
          >
            Click me
          </InlineTipButton>
        );
      case '<InlineTipLink>':
        return (
          <InlineTipLink
            href="https://www.ibm.com"
            onClick={() => {
              action('Clicked the link')();
            }}
            target="_blank"
          >
            Learn more
          </InlineTipLink>
        );
      default:
        return null;
    }
  })();

  return (
    <div
      className={cx([
        narrow ? 'storybook--inline-tip-narrow' : 'storybook--inline-tip-wide',
      ])}
    >
      <InlineTip
        {...args}
        renderMedia={selectedMedia}
        action={selectedAction}
      />
    </div>
  );
};

export const inlineTip = Template.bind({});
inlineTip.args = {
  narrow: false,
  ...defaultProps,
};

export const inlineTipNarrow = Template.bind({});
inlineTipNarrow.args = {
  narrow: true,
  ...defaultProps,
};
