import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchOperationGauge32 from '../../../lib/QResearchOperationGauge/32';

storiesOf('QResearchOperationGauge32', module)
  .add('default', () => <QResearchOperationGauge32 />)
  .add('with accessibility label', () => (
    <QResearchOperationGauge32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchOperationGauge32 focusable>
      <title>Icon title</title>
    </QResearchOperationGauge32>
  ));
