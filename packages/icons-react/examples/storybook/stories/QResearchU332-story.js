import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchU332 from '../../../lib/QResearchU3/32';

storiesOf('QResearchU332', module)
  .add('default', () => <QResearchU332 />)
  .add('with accessibility label', () => (
    <QResearchU332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchU332 focusable>
      <title>Icon title</title>
    </QResearchU332>
  ));
