/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action as storybookAction } from 'storybook/actions';
import { Add, Information } from '@carbon/react/icons';
import CustomIllustration from './story_assets/empty-state-bright-magnifying-glass.svg';
import { EmptyState } from '.';
import mdx from './EmptyState.mdx';
import { Tooltip } from '@carbon/react';

export default {
  title: 'Patterns/Prebuilt patterns/Empty states/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    subtitle: {
      control: {
        type: 'select',
        labels: {
          0: 'default',
          1: 'with tooltip',
        },
      },
      options: [0, 1],
      mapping: { 0: 'default', 1: 'withTooltip' },
    },
  },
  parameters: {
    // styles,
    docs: {
      page: mdx,
    },
  },
};

const emptyStateCommonProps = {
  title: 'Start by adding data assets',
  subtitle: 'default',
};

const Template = ({ ...args }, context) => {
  const sbDocs = context.viewMode !== 'docs';
  const { subtitle, action } = args;

  const getSubTitle = () => {
    return (
      <>
        Click <span>Upload assets</span> to upload your data
      </>
    );
  };
  const getSubTitleWithTooltip = () => {
    return (
      <>
        Click <span>here</span> to upload your data
        <Tooltip label="Facts and statistics collected together for reference or analysis">
          <Information size="16" />
        </Tooltip>
      </>
    );
  };

  const getAction = (icon = undefined) => {
    const actionObj = {
      text: 'Create new',
      onClick: () => {
        sbDocs
          ? storybookAction('Clicked empty state action button')()
          : console.log('Clicked empty state action button');
      },
    };

    if (icon) {
      return {
        ...actionObj,
        renderIcon: (props) => <Add size={20} {...props} />,
        iconDescription: 'Add icon',
      };
    }

    return actionObj;
  };

  return (
    <EmptyState
      {...args}
      subtitle={
        subtitle === 'default' ? getSubTitle() : getSubTitleWithTooltip()
      }
      action={typeof action === 'boolean' && getAction(action)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  ...emptyStateCommonProps,
};

export const WithTooltipInSubtitle = Template.bind({});
WithTooltipInSubtitle.args = {
  ...emptyStateCommonProps,
  subtitle: 'withTooltip',
};

export const WithCustomIllustration = Template.bind({});
WithCustomIllustration.args = {
  ...emptyStateCommonProps,
  illustration: CustomIllustration,
  illustrationDescription: 'Test alt text',
};

export const withAction = Template.bind({});
withAction.args = {
  ...emptyStateCommonProps,
  action: false,
};

export const withActionIconButton = Template.bind({});
withActionIconButton.args = {
  ...emptyStateCommonProps,
  action: true,
};

export const withLink = Template.bind({});
withLink.args = {
  ...emptyStateCommonProps,
  link: {
    text: 'View documentation',
    href: 'https://www.carbondesignsystem.com',
    target: '_blank',
  },
};

export const withActionAndLink = Template.bind({});
withActionAndLink.args = {
  ...emptyStateCommonProps,
  action: true,
  link: {
    text: 'View documentation',
    href: 'https://www.carbondesignsystem.com',
  },
};
