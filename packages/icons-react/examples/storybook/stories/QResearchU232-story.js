import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchU232 from '../../../lib/Q-research--U2/32';

storiesOf('QResearchU232', module)
  .add('default', () => <QResearchU232 />)
  .add('with accessibility label', () => (
    <QResearchU232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchU232 focusable>
      <title>Icon title</title>
    </QResearchU232>
  ));
