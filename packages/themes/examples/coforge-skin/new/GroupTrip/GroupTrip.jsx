/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ContainedList, ContainedListItem, Tag, Tile } from '../../app/carbon';

export function GroupTrip({ title, subtitle, guest = true, members, stops }) {
  return (
    <div className="luma-group-trip">
      {guest ? (
        <Tag type="outline" size="sm">
          Guest mode · read-only
        </Tag>
      ) : null}
      <p>
        <strong>{title}</strong>
      </p>
      <p>{subtitle}</p>
      <Tile>
        <p className="luma-job-door__meta">{members.length} travellers</p>
        <p>{members.map((member) => member.name).join(' · ')}</p>
      </Tile>
      <ContainedList label="Today’s itinerary" kind="on-page">
        {stops.map((stop) => (
          <ContainedListItem key={`${stop.time}-${stop.title}`}>
            <span className="luma-job-door__meta">{stop.time}</span>
            <p>
              <strong>{stop.title}</strong>
              {stop.place ? ` · ${stop.place}` : ''}
            </p>
            <p>
              Joining: {stop.joining} of {members.length}
            </p>
          </ContainedListItem>
        ))}
      </ContainedList>
    </div>
  );
}
