import React from 'react';
import { storiesOf } from '@storybook/react';
import Pause20 from '../../../es/pause/20.js';

storiesOf('Pause20', module)
  .add('default', () => <Pause20 />)
  .add('with accessibility label', () => (
    <Pause20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pause20 aria-label="Icon label">
      <title>Icon title</title>
    </Pause20>
  ));
