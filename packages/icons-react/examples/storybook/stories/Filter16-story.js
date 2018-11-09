import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter16 from '../../../lib/Filter/16';

storiesOf('Filter16', module)
  .add('default', () => <Filter16 />)
  .add('with accessibility label', () => (
    <Filter16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Filter16 focusable>
      <title>Icon title</title>
    </Filter16>
  ));
