import React from 'react';
import { storiesOf } from '@storybook/react';
import Accessibility32 from '../../../lib/accessibility/32';

storiesOf('Accessibility32', module)
  .add('default', () => <Accessibility32 />)
  .add('with accessibility label', () => (
    <Accessibility32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Accessibility32 focusable>
      <title>Icon title</title>
    </Accessibility32>
  ));
