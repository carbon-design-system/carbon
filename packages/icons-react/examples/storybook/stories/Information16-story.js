import React from 'react';
import { storiesOf } from '@storybook/react';
import Information16 from '../../../lib/Information/16';

storiesOf('Information16', module)
  .add('default', () => <Information16 />)
  .add('with accessibility label', () => (
    <Information16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Information16 focusable>
      <title>Icon title</title>
    </Information16>
  ));
