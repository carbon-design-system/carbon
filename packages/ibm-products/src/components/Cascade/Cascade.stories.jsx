/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Cascade } from '.';
import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { Column } from '@carbon/react';
import DocsPage from './Cascade.docs-page';

export default {
  title: 'Utilities/Cascade',
  component: Cascade,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

const DefaultTemplate = (args) => {
  return (
    <Cascade {...args}>
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="box" />
      <div className="box" />
    </Cascade>
  );
};

const GridTemplate = (args) => {
  const getBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      boxes.push(
        <Column lg={4}>
          <div className="grid-box" />
        </Column>
      );
    }
    return boxes;
  };

  return (
    <Cascade {...args}>
      {getBoxes()}
      {getBoxes()}
    </Cascade>
  );
};

export const WithoutGrid = DefaultTemplate.bind({});
WithoutGrid.args = {};

export const WithGrid = GridTemplate.bind({});
WithGrid.args = {
  grid: true,
};
