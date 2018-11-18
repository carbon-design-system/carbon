import React from 'react';
import { storiesOf } from '@storybook/react';
import Recommend24 from '../../../es/recommend/24.js';

storiesOf('Recommend24', module)
  .add('default', () => <Recommend24 />)
  .add('with accessibility label', () => (
    <Recommend24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Recommend24 aria-label="Icon label">
      <title>Icon title</title>
    </Recommend24>
  ));
