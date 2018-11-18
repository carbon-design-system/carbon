import React from 'react';
import { storiesOf } from '@storybook/react';
import Insert20 from '../../../es/insert/20.js';

storiesOf('Insert20', module)
  .add('default', () => <Insert20 />)
  .add('with accessibility label', () => (
    <Insert20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Insert20 aria-label="Icon label">
      <title>Icon title</title>
    </Insert20>
  ));
