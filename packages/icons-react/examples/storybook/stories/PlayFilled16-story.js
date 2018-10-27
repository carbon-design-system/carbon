import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayFilled16 from '../../../lib/play--filled/16';

storiesOf('PlayFilled16', module)
  .add('default', () => <PlayFilled16 />)
  .add('with accessibility label', () => (
    <PlayFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayFilled16 focusable>
      <title>Icon title</title>
    </PlayFilled16>
  ));
