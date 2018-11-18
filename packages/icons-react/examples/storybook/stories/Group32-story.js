import React from 'react';
import { storiesOf } from '@storybook/react';
import Group32 from '../../../es/group/32.js';

storiesOf('Group32', module)
  .add('default', () => <Group32 />)
  .add('with accessibility label', () => (
    <Group32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Group32 aria-label="Icon label">
      <title>Icon title</title>
    </Group32>
  ));
