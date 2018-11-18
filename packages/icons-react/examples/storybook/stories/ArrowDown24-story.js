import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDown24 from '../../../es/arrow--down/24.js';

storiesOf('ArrowDown24', module)
  .add('default', () => <ArrowDown24 />)
  .add('with accessibility label', () => (
    <ArrowDown24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDown24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDown24>
  ));
