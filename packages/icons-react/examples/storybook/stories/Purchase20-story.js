import React from 'react';
import { storiesOf } from '@storybook/react';
import Purchase20 from '../../../es/purchase/20.js';

storiesOf('Purchase20', module)
  .add('default', () => <Purchase20 />)
  .add('with accessibility label', () => (
    <Purchase20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Purchase20 aria-label="Icon label">
      <title>Icon title</title>
    </Purchase20>
  ));
