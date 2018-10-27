import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchOperation32 from '../../../lib/Q-research--operation/32';

storiesOf('QResearchOperation32', module)
  .add('default', () => <QResearchOperation32 />)
  .add('with accessibility label', () => (
    <QResearchOperation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchOperation32 focusable>
      <title>Icon title</title>
    </QResearchOperation32>
  ));
