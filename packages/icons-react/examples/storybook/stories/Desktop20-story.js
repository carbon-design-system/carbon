import React from 'react';
import { storiesOf } from '@storybook/react';
import Desktop20 from '../../../es/desktop/20.js';

storiesOf('Desktop20', module)
  .add('default', () => <Desktop20 />)
  .add('with accessibility label', () => (
    <Desktop20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Desktop20 aria-label="Icon label">
      <title>Icon title</title>
    </Desktop20>
  ));
