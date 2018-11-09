import React from 'react';
import { storiesOf } from '@storybook/react';
import Popup32 from '../../../lib/Popup/32';

storiesOf('Popup32', module)
  .add('default', () => <Popup32 />)
  .add('with accessibility label', () => (
    <Popup32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Popup32 focusable>
      <title>Icon title</title>
    </Popup32>
  ));
