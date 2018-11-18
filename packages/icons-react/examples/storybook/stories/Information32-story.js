import React from 'react';
import { storiesOf } from '@storybook/react';
import Information32 from '../../../es/information/32.js';

storiesOf('Information32', module)
  .add('default', () => <Information32 />)
  .add('with accessibility label', () => (
    <Information32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Information32 aria-label="Icon label">
      <title>Icon title</title>
    </Information32>
  ));
