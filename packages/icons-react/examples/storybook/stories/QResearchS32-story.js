import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchS32 from '../../../lib/Q-research--S/32';

storiesOf('QResearchS32', module)
  .add('default', () => <QResearchS32 />)
  .add('with accessibility label', () => (
    <QResearchS32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchS32 focusable>
      <title>Icon title</title>
    </QResearchS32>
  ));
