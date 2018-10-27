import React from 'react';
import { storiesOf } from '@storybook/react';
import StarSolid16 from '../../../lib/star--solid/16';

storiesOf('StarSolid16', module)
  .add('default', () => <StarSolid16 />)
  .add('with accessibility label', () => (
    <StarSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarSolid16 focusable>
      <title>Icon title</title>
    </StarSolid16>
  ));
