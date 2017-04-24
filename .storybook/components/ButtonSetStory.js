import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ButtonSet from '../../components/ButtonSet';
import Button from '../../components/Button';

storiesOf('ButtonSet (Deprecated)', module)
  .addWithInfo(
    '',
    `
      Button Sets are now deprecated.
      When using SCSS from carbon-components, pairing Button components will automatically space themselves accordingly.
      Pairing Button components are used when an action required by the user has more than one option. Always use a
      positive action button (primary) paired with a negative action button (secondary). Positive action buttons
      should be on the right, while negative action buttons will be on the left.
    `,
    () => (
      <ButtonSet>
        <Button kind="secondary">Backward</Button>
        <Button>Forward</Button>
      </ButtonSet>
  ));
