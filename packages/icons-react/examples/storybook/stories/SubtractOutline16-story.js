import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractOutline16 from '../../../lib/subtract--outline/16';

storiesOf('SubtractOutline16', module)
  .add('default', () => <SubtractOutline16 />)
  .add('with accessibility label', () => (
    <SubtractOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractOutline16 focusable>
      <title>Icon title</title>
    </SubtractOutline16>
  ));
