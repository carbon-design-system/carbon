import React from 'react';
import { storiesOf } from '@storybook/react';
import Fade16 from '../../../lib/Fade/16';

storiesOf('Fade16', module)
  .add('default', () => <Fade16 />)
  .add('with accessibility label', () => (
    <Fade16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Fade16 focusable>
      <title>Icon title</title>
    </Fade16>
  ));
