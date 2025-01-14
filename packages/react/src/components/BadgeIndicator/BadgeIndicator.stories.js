/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import BadgeIndicator from '.';
import mdx from './BadgeIndicator.mdx';
import { Button } from '../Button/index';
import { IconButton } from '../IconButton/index';
import { Notification } from '@carbon/icons-react';

export default {
  title: 'Experimental/StatusIndicators/unstable__BadgeIndicator',
  component: BadgeIndicator,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <IconButton kind="ghost" label="Icon Description">
      <Notification />
      <BadgeIndicator></BadgeIndicator>
    </IconButton>
  );
};

// TODO: remove before merging
export const Test = (args) => {
  return (
    <>
      <h1>Buttons</h1>
      <Button
        kind="ghost"
        iconDescription="Icon Description"
        hasIconOnly
        {...args}>
        <Notification />
        <BadgeIndicator />
      </Button>
      <Button
        kind="ghost"
        iconDescription="Icon Description"
        hasIconOnly
        {...args}>
        <Notification />
        <BadgeIndicator count={3} />
      </Button>
      <Button
        kind="ghost"
        iconDescription="Icon Description"
        hasIconOnly
        {...args}>
        <Notification />
        <BadgeIndicator count={48} />
      </Button>
      <Button
        kind="ghost"
        iconDescription="Icon Description"
        hasIconOnly
        {...args}>
        <Notification />
        <BadgeIndicator count={1234} />
      </Button>

      <h2>Icon Buttons</h2>
      <IconButton kind="ghost" label="Icon Description">
        <Notification />
        <BadgeIndicator />
      </IconButton>

      <IconButton kind="ghost" label="Icon Description">
        <Notification />
        <BadgeIndicator count={3} />
      </IconButton>

      <IconButton kind="ghost" label="Icon Description">
        <Notification />
        <BadgeIndicator count={48} />
      </IconButton>

      <IconButton kind="ghost" label="Icon Description">
        <Notification />
        <BadgeIndicator count={1234} />
      </IconButton>
    </>
  );
};

const PlaygroundStory = (props) => {
  const { count } = props;
  return (
    <IconButton
      kind="ghost"
      label={
        count
          ? `${count} ${count === 1 ? 'notification' : 'notifications'}`
          : 'New notification'
      }>
      <Notification />
      {count ? (
        <BadgeIndicator count={count}></BadgeIndicator>
      ) : (
        <BadgeIndicator></BadgeIndicator>
      )}
    </IconButton>
  );
};

export const Playground = PlaygroundStory.bind({});
