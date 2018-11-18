import React from 'react';
import { storiesOf } from '@storybook/react';
import Group20 from '../../../es/group/20.js';

storiesOf('Group20', module)
  .add('default', () => <Group20 />)
  .add('with accessibility label', () => (
    <Group20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Group20 aria-label="Icon label">
      <title>Icon title</title>
    </Group20>
  ));
