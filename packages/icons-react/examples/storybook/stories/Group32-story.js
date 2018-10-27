import React from 'react';
import { storiesOf } from '@storybook/react';
import Group32 from '../../../lib/group/32';

storiesOf('Group32', module)
  .add('default', () => <Group32 />)
  .add('with accessibility label', () => (
    <Group32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Group32 focusable>
      <title>Icon title</title>
    </Group32>
  ));
