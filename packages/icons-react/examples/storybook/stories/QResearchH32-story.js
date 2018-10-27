import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchH32 from '../../../lib/Q-research--H/32';

storiesOf('QResearchH32', module)
  .add('default', () => <QResearchH32 />)
  .add('with accessibility label', () => (
    <QResearchH32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchH32 focusable>
      <title>Icon title</title>
    </QResearchH32>
  ));
