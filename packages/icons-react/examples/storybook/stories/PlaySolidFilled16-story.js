import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolidFilled16 from '../../../es/play--solid--filled/16.js';

storiesOf('PlaySolidFilled16', module)
  .add('default', () => <PlaySolidFilled16 />)
  .add('with accessibility label', () => (
    <PlaySolidFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolidFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </PlaySolidFilled16>
  ));
