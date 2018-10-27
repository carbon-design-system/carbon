import React from 'react';
import { storiesOf } from '@storybook/react';
import Cloud32 from '../../../lib/cloud/32';

storiesOf('Cloud32', module)
  .add('default', () => <Cloud32 />)
  .add('with accessibility label', () => (
    <Cloud32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cloud32 focusable>
      <title>Icon title</title>
    </Cloud32>
  ));
