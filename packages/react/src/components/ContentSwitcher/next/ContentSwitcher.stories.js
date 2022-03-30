/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../../Switch';
import { Layer } from '../../Layer';
import mdx from '../ContentSwitcher.mdx';

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  subcomponents: {
    Switch,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <ContentSwitcher onChange={() => {}}>
    <Switch name="one" text="First section" />
    <Switch name="two" text="Second section" />
    <Switch name="three" text="Third section" />
  </ContentSwitcher>
);

export const WithLayer = () => {
  return (
    <>
      <ContentSwitcher onChange={() => {}}>
        <Switch name="one" text="First section" />
        <Switch name="two" text="Second section" />
        <Switch name="three" text="Third section" />
      </ContentSwitcher>
      <Layer>
        <ContentSwitcher onChange={() => {}}>
          <Switch name="one" text="First section" />
          <Switch name="two" text="Second section" />
          <Switch name="three" text="Third section" />
        </ContentSwitcher>
        <Layer>
          <ContentSwitcher onChange={() => {}}>
            <Switch name="one" text="First section" />
            <Switch name="two" text="Second section" />
            <Switch name="three" text="Third section" />
          </ContentSwitcher>
        </Layer>
      </Layer>
    </>
  );
};
