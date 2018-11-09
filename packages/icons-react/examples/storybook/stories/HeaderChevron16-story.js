import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderChevron16 from '../../../lib/HeaderChevron/16';

storiesOf('HeaderChevron16', module)
  .add('default', () => <HeaderChevron16 />)
  .add('with accessibility label', () => (
    <HeaderChevron16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderChevron16 focusable>
      <title>Icon title</title>
    </HeaderChevron16>
  ));
