/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ScrollGradient } from '.';
import mdx from './ScrollGradient.mdx';

import styles from './_storybook-styles.scss?inline';

const storyCopy =
  'Use case specific content to display in the ScrollGradient component. Use case specific content to display in the ScrollGradient component. Use case specific content to display in the ScrollGradient component. ';

const storyChildren = (
  <div style={{ padding: 16 }}>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
  </div>
);

export default {
  title: 'Utilities/ScrollGradient',
  component: ScrollGradient,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};
const style = {
  width: '100%',
  height: '100%',
};
/**
 * TODO: Declare template(s) for one or more scenarios.
 */

const Template = (args) => {
  return (
    <div className="templateContainer">
      <ScrollGradient style={style} className={'myScrollGradient'} {...args} />
    </div>
  );
};

const TemplateBothAxis = (args) => {
  return (
    <div className="templateContainer-sm">
      <ScrollGradient style={style} className={'myScrollGradient'} {...args} />
    </div>
  );
};

export const scrollGradientVertical = Template.bind({});
scrollGradientVertical.args = {
  children: storyChildren,
};

export const scrollGradientXAndYAxis = TemplateBothAxis.bind({});
scrollGradientXAndYAxis.args = {
  children: <div style={{ width: '1500px' }}>{storyChildren}</div>,
};
