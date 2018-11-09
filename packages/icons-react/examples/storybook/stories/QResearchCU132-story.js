import React from 'react';
import { storiesOf } from '@storybook/react';
import QResearchCu132 from '../../../lib/QResearchCU1/32';

storiesOf('QResearchCu132', module)
  .add('default', () => <QResearchCu132 />)
  .add('with accessibility label', () => (
    <QResearchCu132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QResearchCu132 focusable>
      <title>Icon title</title>
    </QResearchCu132>
  ));
