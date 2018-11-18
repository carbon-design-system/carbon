import React from 'react';
import { storiesOf } from '@storybook/react';
import Restart20 from '../../../es/restart/20.js';

storiesOf('Restart20', module)
  .add('default', () => <Restart20 />)
  .add('with accessibility label', () => (
    <Restart20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restart20 aria-label="Icon label">
      <title>Icon title</title>
    </Restart20>
  ));
