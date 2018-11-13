import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractAlt16 from '../../../lib/SubtractAlt/16';

storiesOf('SubtractAlt16', module)
  .add('default', () => <SubtractAlt16 />)
  .add('with accessibility label', () => (
    <SubtractAlt16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractAlt16 focusable>
      <title>Icon title</title>
    </SubtractAlt16>
  ));
