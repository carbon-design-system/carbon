import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolidFilled32 from '../../../lib/play--solid--filled/32';

storiesOf('PlaySolidFilled32', module)
  .add('default', () => <PlaySolidFilled32 />)
  .add('with accessibility label', () => (
    <PlaySolidFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolidFilled32 focusable>
      <title>Icon title</title>
    </PlaySolidFilled32>
  ));
