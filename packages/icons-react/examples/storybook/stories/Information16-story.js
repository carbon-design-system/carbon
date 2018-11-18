import React from 'react';
import { storiesOf } from '@storybook/react';
import Information16 from '../../../es/information/16.js';

storiesOf('Information16', module)
  .add('default', () => <Information16 />)
  .add('with accessibility label', () => (
    <Information16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Information16 aria-label="Icon label">
      <title>Icon title</title>
    </Information16>
  ));
