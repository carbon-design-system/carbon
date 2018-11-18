import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretDown24 from '../../../es/caret--down/24.js';

storiesOf('CaretDown24', module)
  .add('default', () => <CaretDown24 />)
  .add('with accessibility label', () => (
    <CaretDown24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretDown24 aria-label="Icon label">
      <title>Icon title</title>
    </CaretDown24>
  ));
