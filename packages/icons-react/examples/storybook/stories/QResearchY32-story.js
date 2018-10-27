import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchY32 from '../../../lib/Q-research--Y/32';

storiesOf('QResearchY32', module)
  .add('default', () => <QResearchY32 />)
  .add('with accessibility label', () => (
    <QResearchY32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchY32 focusable>
      <title>Icon title</title>
    </QResearchY32>
  ));
