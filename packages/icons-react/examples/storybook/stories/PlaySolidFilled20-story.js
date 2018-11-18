import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolidFilled20 from '../../../es/play--solid--filled/20.js';

storiesOf('PlaySolidFilled20', module)
  .add('default', () => <PlaySolidFilled20 />)
  .add('with accessibility label', () => (
    <PlaySolidFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolidFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </PlaySolidFilled20>
  ));
