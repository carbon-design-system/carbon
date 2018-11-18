import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolidFilled32 from '../../../es/play--solid--filled/32.js';

storiesOf('PlaySolidFilled32', module)
  .add('default', () => <PlaySolidFilled32 />)
  .add('with accessibility label', () => (
    <PlaySolidFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolidFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </PlaySolidFilled32>
  ));
