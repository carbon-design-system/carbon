import React from 'react';
import { storiesOf } from '@storybook/react';
import Recommend20 from '../../../es/recommend/20.js';

storiesOf('Recommend20', module)
  .add('default', () => <Recommend20 />)
  .add('with accessibility label', () => (
    <Recommend20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recommend20 aria-label="Icon label">
      <title>Icon title</title>
    </Recommend20>
  ));
