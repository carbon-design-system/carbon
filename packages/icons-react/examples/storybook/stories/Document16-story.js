import React from 'react';
import { storiesOf } from '@storybook/react';
import Document16 from '../../../lib/Document/16';

storiesOf('Document16', module)
  .add('default', () => <Document16 />)
  .add('with accessibility label', () => (
    <Document16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Document16 focusable>
      <title>Icon title</title>
    </Document16>
  ));
