import React from 'react';
import { storiesOf } from '@storybook/react';
import Awake16 from '../../../es/awake/16.js';

storiesOf('Awake16', module)
  .add('default', () => <Awake16 />)
  .add('with accessibility label', () => (
    <Awake16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Awake16 aria-label="Icon label">
      <title>Icon title</title>
    </Awake16>
  ));
