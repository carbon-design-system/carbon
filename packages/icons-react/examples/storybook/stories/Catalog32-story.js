import React from 'react';
import { storiesOf } from '@storybook/react';
import Catalog32 from '../../../lib/Catalog/32';

storiesOf('Catalog32', module)
  .add('default', () => <Catalog32 />)
  .add('with accessibility label', () => (
    <Catalog32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Catalog32 focusable>
      <title>Icon title</title>
    </Catalog32>
  ));
