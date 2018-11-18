import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronRight20 from '../../../es/chevron--right/20.js';

storiesOf('ChevronRight20', module)
  .add('default', () => <ChevronRight20 />)
  .add('with accessibility label', () => (
    <ChevronRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronRight20 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronRight20>
  ));
