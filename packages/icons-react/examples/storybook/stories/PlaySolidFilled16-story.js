import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolidFilled16 from '../../../lib/PlaySolidFilled/16';

storiesOf('PlaySolidFilled16', module)
  .add('default', () => <PlaySolidFilled16 />)
  .add('with accessibility label', () => (
    <PlaySolidFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolidFilled16 focusable>
      <title>Icon title</title>
    </PlaySolidFilled16>
  ));
