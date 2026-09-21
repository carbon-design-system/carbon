/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, Tag, Tile } from '../../app/carbon';

function euros(n) {
  return n.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  });
}

export function StayOffer({ hotel, selected, onSelect }) {
  return (
    <Tile
      className={selected ? 'luma-offer luma-offer--selected' : 'luma-offer'}
      id={`stay-${hotel.id}`}>
      <p className="luma-job-door__meta">
        {hotel.stars} star · {hotel.neighborhood}
      </p>
      <h2>{hotel.name}</h2>
      <p>{hotel.address}</p>
      <p>{hotel.description}</p>
      <div className="luma-offer__tags">
        {hotel.amenities.slice(0, 4).map((item) => (
          <Tag key={item} type="outline" size="sm">
            {item}
          </Tag>
        ))}
      </div>
      <dl className="luma-measure">
        <dt>Per night</dt>
        <dd>{euros(hotel.pricePerNight)}</dd>
        <dt>{hotel.nights} nights</dt>
        <dd>{euros(hotel.totalPrice)}</dd>
        <dt>Guest score</dt>
        <dd>
          {hotel.rating} ({hotel.reviewCount})
        </dd>
      </dl>
      <Button
        kind={selected ? 'secondary' : 'primary'}
        size="lg"
        onClick={() => onSelect(hotel)}>
        {selected ? 'Selected' : 'Book stay'}
      </Button>
    </Tile>
  );
}
