import React from 'react';
import { storiesOf } from '@storybook/react';
import Group24 from '../../../es/group/24.js';

storiesOf('Group24', module)
  .add('default', () => <Group24 />)
  .add('with accessibility label', () => (
    <Group24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Group24 aria-label="Icon label">
      <title>Icon title</title>
    </Group24>
  ));
