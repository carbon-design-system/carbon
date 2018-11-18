import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox20 from '../../../es/checkbox/20.js';

storiesOf('Checkbox20', module)
  .add('default', () => <Checkbox20 />)
  .add('with accessibility label', () => (
    <Checkbox20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Checkbox20 aria-label="Icon label">
      <title>Icon title</title>
    </Checkbox20>
  ));
