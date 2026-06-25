/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { action } from 'storybook/actions';

import { ButtonMenu, ButtonMenuItem } from '.';
// import mdx from './ButtonMenu.mdx';

// import styles from './_storybook-styles.scss?inline';

import { Add } from '@carbon/react/icons';
import { Annotation } from '../../../.storybook/Annotation';

export default {
  title: 'Internal/ButtonMenu',
  component: ButtonMenu,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
  parameters: {
    // styles,
    /*
docs: {
      page: mdx,
    },
*/
  },
};

const Template = (args) => {
  return (
    <Annotation
      type="deprecation-notice"
      text={
        <div>
          This component is deprecated and will be removed in the next major
          version. Please migrate to Carbon&apos;s{' '}
          <a href="https://react.carbondesignsystem.com/?path=/docs/components-menubutton--overview">
            MenuButton
          </a>
          .
        </div>
      }
    >
      <ButtonMenu
        label="Primary button"
        menuAriaLabel="Primary button"
        renderIcon={(props) => <Add size={16} {...props} />}
        {...args}
      >
        <ButtonMenuItem
          itemText="Option 1a"
          onClick={action(`Click on Option 1`)}
        />
        <ButtonMenuItem
          itemText="Option 2"
          onClick={action(`Click on Option 2`)}
        />
        <ButtonMenuItem
          itemText="Option 3"
          onClick={action(`Click on Option 3`)}
        />
        <ButtonMenuItem
          itemText="Option 4"
          onClick={action(`Click on Option 4`)}
          hasDivider
        />
      </ButtonMenu>
    </Annotation>
  );
};

export const buttonMenu = Template.bind({});
buttonMenu.storyName = 'Button menu';
