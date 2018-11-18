import React from 'react';
import { storiesOf } from '@storybook/react';
import Information20 from '../../../es/information/20.js';

storiesOf('Information20', module)
  .add('default', () => <Information20 />)
  .add('with accessibility label', () => (
    <Information20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Information20 aria-label="Icon label">
      <title>Icon title</title>
    </Information20>
  ));
