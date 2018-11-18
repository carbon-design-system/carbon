import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronDown24 from '../../../es/chevron--down/24.js';

storiesOf('ChevronDown24', module)
  .add('default', () => <ChevronDown24 />)
  .add('with accessibility label', () => (
    <ChevronDown24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronDown24 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronDown24>
  ));
