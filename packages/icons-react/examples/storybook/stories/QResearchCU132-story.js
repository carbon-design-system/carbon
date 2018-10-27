import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCU132 from '../../../lib/Q-research--cU1/32';

storiesOf('QResearchCU132', module)
  .add('default', () => <QResearchCU132 />)
  .add('with accessibility label', () => (
    <QResearchCU132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCU132 focusable>
      <title>Icon title</title>
    </QResearchCU132>
  ));
