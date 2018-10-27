import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchZ32 from '../../../lib/Q-research--Z/32';

storiesOf('QResearchZ32', module)
  .add('default', () => <QResearchZ32 />)
  .add('with accessibility label', () => (
    <QResearchZ32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchZ32 focusable>
      <title>Icon title</title>
    </QResearchZ32>
  ));
