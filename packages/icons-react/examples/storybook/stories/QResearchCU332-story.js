import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCu332 from '../../../lib/QResearchCU3/32';

storiesOf('QResearchCu332', module)
  .add('default', () => <QResearchCu332 />)
  .add('with accessibility label', () => (
    <QResearchCu332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCu332 focusable>
      <title>Icon title</title>
    </QResearchCu332>
  ));
