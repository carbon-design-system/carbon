import React from 'react';
import { storiesOf } from '@storybook/react';
import Repeat20 from '../../../es/repeat/20.js';

storiesOf('Repeat20', module)
  .add('default', () => <Repeat20 />)
  .add('with accessibility label', () => (
    <Repeat20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Repeat20 aria-label="Icon label">
      <title>Icon title</title>
    </Repeat20>
  ));
