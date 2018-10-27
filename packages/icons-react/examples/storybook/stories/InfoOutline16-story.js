import React from 'react';
import { storiesOf } from '@storybook/react';
import InfoOutline16 from '../../../lib/info--outline/16';

storiesOf('InfoOutline16', module)
  .add('default', () => <InfoOutline16 />)
  .add('with accessibility label', () => (
    <InfoOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InfoOutline16 focusable>
      <title>Icon title</title>
    </InfoOutline16>
  ));
