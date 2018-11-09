import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchOperationIf32 from '../../../lib/QResearchOperationIf/32';

storiesOf('QResearchOperationIf32', module)
  .add('default', () => <QResearchOperationIf32 />)
  .add('with accessibility label', () => (
    <QResearchOperationIf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchOperationIf32 focusable>
      <title>Icon title</title>
    </QResearchOperationIf32>
  ));
