import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchID32 from '../../../lib/Q-research--iD/32';

storiesOf('QResearchID32', module)
  .add('default', () => <QResearchID32 />)
  .add('with accessibility label', () => (
    <QResearchID32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchID32 focusable>
      <title>Icon title</title>
    </QResearchID32>
  ));
