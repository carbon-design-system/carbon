import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchT32 from '../../../lib/Q-research--T/32';

storiesOf('QResearchT32', module)
  .add('default', () => <QResearchT32 />)
  .add('with accessibility label', () => (
    <QResearchT32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchT32 focusable>
      <title>Icon title</title>
    </QResearchT32>
  ));
