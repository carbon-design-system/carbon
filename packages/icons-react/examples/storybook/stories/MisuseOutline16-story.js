import React from 'react';
import { storiesOf } from '@storybook/react';
import MisuseOutline16 from '../../../es/misuse--outline/16.js';

storiesOf('MisuseOutline16', module)
  .add('default', () => <MisuseOutline16 />)
  .add('with accessibility label', () => (
    <MisuseOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MisuseOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </MisuseOutline16>
  ));
