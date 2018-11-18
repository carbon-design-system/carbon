import React from 'react';
import { storiesOf } from '@storybook/react';
import Report20 from '../../../es/report/20.js';

storiesOf('Report20', module)
  .add('default', () => <Report20 />)
  .add('with accessibility label', () => (
    <Report20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Report20 aria-label="Icon label">
      <title>Icon title</title>
    </Report20>
  ));
