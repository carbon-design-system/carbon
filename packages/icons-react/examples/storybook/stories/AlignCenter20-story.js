import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignCenter20 from '../../../es/align--center/20.js';

storiesOf('AlignCenter20', module)
  .add('default', () => <AlignCenter20 />)
  .add('with accessibility label', () => (
    <AlignCenter20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignCenter20 aria-label="Icon label">
      <title>Icon title</title>
    </AlignCenter20>
  ));
