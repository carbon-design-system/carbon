import React from 'react';
import { storiesOf } from '@storybook/react';
import HeaderTicket16 from '../../../lib/header--ticket/16';

storiesOf('HeaderTicket16', module)
  .add('default', () => <HeaderTicket16 />)
  .add('with accessibility label', () => (
    <HeaderTicket16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HeaderTicket16 focusable>
      <title>Icon title</title>
    </HeaderTicket16>
  ));
