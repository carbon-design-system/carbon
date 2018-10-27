import React from 'react';
import { storiesOf } from '@storybook/react';
import Information32 from '../../../lib/information/32';

storiesOf('Information32', module)
  .add('default', () => <Information32 />)
  .add('with accessibility label', () => (
    <Information32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Information32 focusable>
      <title>Icon title</title>
    </Information32>
  ));
