/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action as storybookAction } from 'storybook/actions';
import { Add } from '@carbon/react/icons';
import mdx from './NotFoundEmptyState.mdx';
import { NotFoundEmptyState } from '.';

// import styles from '../_index.scss';

export default {
  title: 'Patterns/Prebuilt patterns/Empty states/NotFoundEmptyState',
  component: NotFoundEmptyState,
  tags: ['autodocs'],
  parameters: {
    // styles,
    docs: {
      page: mdx,
    },
  },
};

const defaultStoryProps = {
  headingAs: 'h3',
  title: 'Empty state title',
  subtitle: 'Description text explaining why this section is empty.',
  illustrationDescription: 'Test alt text',
};

const Template = ({ ...args }, context) => {
  const sbDocs = context.viewMode !== 'docs';
  const { action } = args;
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
    <NotFoundEmptyState
      {...args}
      action={typeof action === 'boolean' && getAction(action)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultStoryProps,
};

export const WithDarkModeIllustration = Template.bind({});
WithDarkModeIllustration.args = {
  ...defaultStoryProps,
  illustrationTheme: 'dark',
};

export const withAction = Template.bind({});
withAction.args = {
  ...defaultStoryProps,
  action: false,
};

export const withActionIconButton = Template.bind({});
withActionIconButton.args = {
  ...defaultStoryProps,
  action: true,
};

export const withLink = Template.bind({});
withLink.args = {
  ...defaultStoryProps,
  link: {
    text: 'View documentation',
    href: 'https://www.carbondesignsystem.com',
  },
};

export const withActionAndLink = Template.bind({});
withActionAndLink.args = {
  ...defaultStoryProps,
  action: true,
  link: {
    text: 'View documentation',
    href: 'https://www.carbondesignsystem.com',
  },
};
