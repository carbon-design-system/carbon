import React from 'react';
import { storiesOf } from '@storybook/react';
import ListNumbered32 from '../../../lib/ListNumbered/32';

storiesOf('ListNumbered32', module)
  .add('default', () => <ListNumbered32 />)
  .add('with accessibility label', () => (
    <ListNumbered32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListNumbered32 focusable>
      <title>Icon title</title>
    </ListNumbered32>
  ));
