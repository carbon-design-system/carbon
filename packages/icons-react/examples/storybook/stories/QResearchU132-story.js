import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchU132 from '../../../lib/QResearchU1/32';

storiesOf('QResearchU132', module)
  .add('default', () => <QResearchU132 />)
  .add('with accessibility label', () => (
    <QResearchU132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchU132 focusable>
      <title>Icon title</title>
    </QResearchU132>
  ));
