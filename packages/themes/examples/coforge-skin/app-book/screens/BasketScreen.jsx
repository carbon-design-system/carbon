/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '../../app/carbon';
import { TripBasket } from '../../new/TripBasket/TripBasket';

export function BasketScreen({
  lines,
  total,
  empty,
  onContinue,
  onAddStay,
  onAddActivity,
}) {
  return (
    <>
      <h1>Review your selections</h1>
      <p>MAD → KRK · 18–25 Sep · 8 travellers. Every line is in the total.</p>
      <TripBasket
        lines={lines}
        total={total}
        empty={empty}
        onContinue={empty ? null : onContinue}
        onAddStay={onAddStay}
        onAddActivity={onAddActivity}
      />
      {empty ? (
        <Button kind="primary" size="lg" onClick={onAddStay}>
          Search stays
        </Button>
      ) : null}
    </>
  );
}
