import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignRight20 from '../../../es/align--right/20.js';

storiesOf('AlignRight20', module)
  .add('default', () => <AlignRight20 />)
  .add('with accessibility label', () => (
    <AlignRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignRight20 aria-label="Icon label">
      <title>Icon title</title>
    </AlignRight20>
  ));
