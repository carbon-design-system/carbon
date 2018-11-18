import React from 'react';
import { storiesOf } from '@storybook/react';
import Indent24 from '../../../es/indent/24.js';

storiesOf('Indent24', module)
  .add('default', () => <Indent24 />)
  .add('with accessibility label', () => (
    <Indent24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Indent24 aria-label="Icon label">
      <title>Icon title</title>
    </Indent24>
  ));
