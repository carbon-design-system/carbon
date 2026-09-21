/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, RadioTile, TileGroup } from '../../app/carbon';

function euros(n) {
  return n.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  });
}

export function FareCompare({
  travellers,
  basePerPerson,
  selected,
  onChange,
  onContinue,
}) {
  const flexPerPerson = basePerPerson + 30;

  return (
    <div className="luma-fare-compare">
      <TileGroup
        name="fare-family"
        legend="Fare family"
        valueSelected={selected || 'basic'}
        onChange={(value) => onChange(value)}>
        <RadioTile id="fare-basic" value="basic">
          <h2>Basic</h2>
          <p>
            Cabin bag only. Change fee applies. {euros(basePerPerson)} per
            person.
          </p>
          <p>Group: {euros(basePerPerson * travellers)}</p>
        </RadioTile>
        <RadioTile id="fare-flex" value="flexible">
          <h2>Flexible</h2>
          <p>
            Cabin bag plus one change without fee up to 24h before departure.{' '}
            {euros(flexPerPerson)} per person.
          </p>
          <p>Group: {euros(flexPerPerson * travellers)}</p>
        </RadioTile>
      </TileGroup>
      <Button kind="primary" size="lg" onClick={onContinue}>
        Add to trip
      </Button>
    </div>
  );
}
