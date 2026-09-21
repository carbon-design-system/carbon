/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '../../app/carbon';
import { StayOffer } from '../../new/StayOffer/StayOffer';
import { hotels } from '../data/hotels';

export function HotelResultsScreen({ selectedHotel, selectHotel, onContinue }) {
  return (
    <>
      <h1>Stays in Kraków</h1>
      <p>
        18–25 Sep · 7 nights. Totals are room rate × nights, shown before Pay.
      </p>
      {hotels.map((hotel) => (
        <StayOffer
          key={hotel.id}
          hotel={hotel}
          selected={selectedHotel?.id === hotel.id}
          onSelect={selectHotel}
        />
      ))}
      {selectedHotel ? (
        <Button kind="primary" size="lg" onClick={onContinue}>
          Continue with {selectedHotel.name}
        </Button>
      ) : null}
    </>
  );
}
