import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCU332 from '../../../lib/Q-research--cU3/32';

storiesOf('QResearchCU332', module)
  .add('default', () => <QResearchCU332 />)
  .add('with accessibility label', () => (
    <QResearchCU332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCU332 focusable>
      <title>Icon title</title>
    </QResearchCU332>
  ));
