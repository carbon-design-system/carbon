import React from 'react';
import { storiesOf } from '@storybook/react';
import HdFilled20 from '../../../es/HD--filled/20.js';

storiesOf('HdFilled20', module)
  .add('default', () => <HdFilled20 />)
  .add('with accessibility label', () => (
    <HdFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HdFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </HdFilled20>
  ));
