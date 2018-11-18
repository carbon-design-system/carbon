import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolidFilled24 from '../../../es/play--solid--filled/24.js';

storiesOf('PlaySolidFilled24', module)
  .add('default', () => <PlaySolidFilled24 />)
  .add('with accessibility label', () => (
    <PlaySolidFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolidFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </PlaySolidFilled24>
  ));
