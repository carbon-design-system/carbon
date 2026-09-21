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

export function ActivityOffer({ activity, selected, onSelect }) {
  return (
    <Tile
      className={selected ? 'luma-offer luma-offer--selected' : 'luma-offer'}
      id={`activity-${activity.id}`}>
      <p className="luma-job-door__meta">
        {activity.date} · {activity.time}
      </p>
      <h2>{activity.name}</h2>
      <div className="luma-offer__tags">
        <Tag type="outline" size="sm">
          {activity.category}
        </Tag>
        <Tag type="outline" size="sm">
          {activity.duration}
        </Tag>
      </div>
      <p>{activity.description}</p>
      <p>Meet: {activity.meetingPoint}</p>
      <dl className="luma-measure">
        <dt>Per person</dt>
        <dd>{euros(activity.pricePerPerson)}</dd>
        <dt>Group total</dt>
        <dd>{euros(activity.totalPrice)}</dd>
      </dl>
      <Button
        kind={selected ? 'secondary' : 'primary'}
        size="lg"
        onClick={() => onSelect(activity)}>
        {selected ? 'Added' : 'Book activity'}
      </Button>
    </Tile>
  );
}
