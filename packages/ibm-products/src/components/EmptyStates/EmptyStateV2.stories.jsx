/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Add, Information } from '@carbon/react/icons';
import CustomIllustration from './story_assets/empty-state-bright-magnifying-glass.svg';
import { EmptyStateV2 } from '.';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import { Annotation } from '../../../.storybook/Annotation';
import { Tooltip } from '@carbon/react';

export default {
  title: 'Deprecated/Empty state/EmptyStateV2',
  component: EmptyStateV2,
  tags: ['autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      page: () => (
        <StoryDocsPage
          altGuidelinesHref={[
            {
              href: 'https://www.carbondesignsystem.com/patterns/empty-states-pattern/',
              label: 'Carbon empty states pattern',
            },
          ]}
          deprecationNotice="This component is deprecated and will be removed in the next major version. For more information, please refer to the [Carbon docs](https://carbondesignsystem.com/patterns/empty-states-pattern/)."
        />
      ),
    },
  },
  decorators: [
    (story) => (
      <div>
        <Annotation
          type="deprecation-notice"
          text={
            <div>
              This component is deprecated and will be removed in the next major
              version. For more information, please refer to the{' '}
              <a href="https://carbondesignsystem.com/patterns/empty-states-pattern/">
                Carbon docs
              </a>
              .
            </div>
          }
        >
          {story()}
        </Annotation>
      </div>
    ),
  ],
};

const defaultProps = {
  className: 'example-class',
  illustrationDescription: 'Example description',
  illustrationPosition: 'top',
  illustrationTheme: 'light',
  size: 'lg',
  subtitle: 'Example subtitle',
  title: 'Example EmptyState title',
};

const defaultActionProps = {
  kind: 'tertiary',
  onClick: action('Clicked empty state action button'),
  text: 'Create new',
};

const defaultIconProps = {
  iconDescription: 'Add icon',
  renderIcon: (props) => <Add size={20} {...props} />,
};

const defaultLinkProps = {
  href: 'https://www.carbondesignsystem.com',
  text: 'View documentation',
};

const Template = (args) => <EmptyStateV2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithTooltipInSubtitle = Template.bind({});
WithTooltipInSubtitle.args = {
  ...defaultProps,
  subtitle: (
    <>
      Click <span>here</span> to upload your data
      <Tooltip label="Facts and statistics collected together for reference or analysis">
        <Information size="16" />
      </Tooltip>
    </>
  ),
};

export const WithCustomIllustration = Template.bind({});
WithCustomIllustration.args = {
  ...defaultProps,
  illustration: CustomIllustration,
};

export const withAction = Template.bind({});
withAction.args = {
  ...defaultProps,
  action: { ...defaultActionProps },
};

export const withActionIconButton = Template.bind({});
withActionIconButton.args = {
  ...defaultProps,
  action: {
    ...defaultActionProps,
    ...defaultIconProps,
  },
};

export const withLink = Template.bind({});
withLink.args = {
  ...defaultProps,
  link: { ...defaultLinkProps },
};

export const withActionAndLink = Template.bind({});
withActionAndLink.args = {
  ...defaultProps,
  action: {
    ...defaultActionProps,
    ...defaultIconProps,
  },
  link: { ...defaultLinkProps },
};
