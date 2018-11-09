import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderDocs16 from '../../../lib/HeaderDocs/16';

storiesOf('HeaderDocs16', module)
  .add('default', () => <HeaderDocs16 />)
  .add('with accessibility label', () => (
    <HeaderDocs16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderDocs16 focusable>
      <title>Icon title</title>
    </HeaderDocs16>
  ));
