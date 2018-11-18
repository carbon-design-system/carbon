import React from 'react';
import { storiesOf } from '@storybook/react';
import Eyedropper20 from '../../../es/eyedropper/20.js';

storiesOf('Eyedropper20', module)
  .add('default', () => <Eyedropper20 />)
  .add('with accessibility label', () => (
    <Eyedropper20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Eyedropper20 aria-label="Icon label">
      <title>Icon title</title>
    </Eyedropper20>
  ));
