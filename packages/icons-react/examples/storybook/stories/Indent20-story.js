import React from 'react';
import { storiesOf } from '@storybook/react';
import Indent20 from '../../../es/indent/20.js';

storiesOf('Indent20', module)
  .add('default', () => <Indent20 />)
  .add('with accessibility label', () => (
    <Indent20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Indent20 aria-label="Icon label">
      <title>Icon title</title>
    </Indent20>
  ));
