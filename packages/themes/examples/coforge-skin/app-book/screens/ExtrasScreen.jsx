/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Button,
  Checkbox,
  RadioButton,
  RadioButtonGroup,
} from '../../app/carbon';
import { euros } from './format';

export function ExtrasScreen({ extras, setExtras, travellers, onContinue }) {
  const bags =
    (extras.checkedBag ? 35 * travellers : 0) +
    (extras.extraBag ? 50 * travellers : 0);
  const insurance =
    extras.insurance === 'basic'
      ? 12 * travellers
      : extras.insurance === 'premium'
        ? 28 * travellers
        : 0;

  return (
    <>
      <h1>Add-ons</h1>
      <p>
        Optional. Amounts below are added on Payment. Skip if you do not need
        them.
      </p>
      <Checkbox
        id="bag-checked"
        labelText={`Checked bag · ${euros(35)} per person (${euros(35 * travellers)} group)`}
        checked={extras.checkedBag}
        onChange={(_, { checked }) =>
          setExtras({ ...extras, checkedBag: checked })
        }
      />
      <Checkbox
        id="bag-extra"
        labelText={`Second bag · ${euros(50)} per person (${euros(50 * travellers)} group)`}
        checked={extras.extraBag}
        onChange={(_, { checked }) =>
          setExtras({ ...extras, extraBag: checked })
        }
      />
      <RadioButtonGroup
        legendText="Seat preference (no extra charge in this prototype)"
        name="seat"
        valueSelected={extras.seatPreference}
        onChange={(value) => setExtras({ ...extras, seatPreference: value })}>
        <RadioButton id="seat-any" labelText="Any" value="any" />
        <RadioButton id="seat-window" labelText="Window" value="window" />
        <RadioButton id="seat-aisle" labelText="Aisle" value="aisle" />
      </RadioButtonGroup>
      <RadioButtonGroup
        legendText="Insurance"
        name="insurance"
        valueSelected={extras.insurance}
        onChange={(value) => setExtras({ ...extras, insurance: value })}>
        <RadioButton id="ins-none" labelText="None" value="none" />
        <RadioButton
          id="ins-basic"
          labelText={`Basic · ${euros(12)} pp (${euros(12 * travellers)})`}
          value="basic"
        />
        <RadioButton
          id="ins-prem"
          labelText={`Premium · ${euros(28)} pp (${euros(28 * travellers)})`}
          value="premium"
        />
      </RadioButtonGroup>
      <p>
        Add-ons subtotal: <strong>{euros(bags + insurance)}</strong>
      </p>
      <Button kind="primary" size="lg" onClick={onContinue}>
        Continue to payment
      </Button>
    </>
  );
}
