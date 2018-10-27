import React from 'react';
import { storiesOf } from '@storybook/react';
import PlaySolid16 from '../../../lib/play--solid/16';

storiesOf('PlaySolid16', module)
  .add('default', () => <PlaySolid16 />)
  .add('with accessibility label', () => (
    <PlaySolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlaySolid16 focusable>
      <title>Icon title</title>
    </PlaySolid16>
  ));
