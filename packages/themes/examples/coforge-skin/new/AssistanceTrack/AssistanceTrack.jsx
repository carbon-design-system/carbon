/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ContainedList,
  ContainedListItem,
  InlineNotification,
  Tag,
  Tile,
} from '../../app/carbon';

export function AssistanceTrack({ flight, events, currentId, reassurance }) {
  return (
    <div className="luma-assistance-track">
      {flight ? (
        <Tile>
          <p className="luma-job-door__meta">
            {flight.number} · {flight.gate}
          </p>
          <p>
            <strong>{flight.origin}</strong> {flight.originTime}
            {' → '}
            <strong>{flight.destination}</strong> {flight.destinationTime}
          </p>
        </Tile>
      ) : null}
      <ContainedList label="Assistance status" kind="on-page">
        {events.map((event) => {
          const current = event.id === currentId;
          return (
            <ContainedListItem key={event.id}>
              {current ? (
                <Tag type="outline" size="sm">
                  Current
                </Tag>
              ) : null}
              <p>
                <strong>{event.title}</strong>
              </p>
              <p>{event.detail}</p>
            </ContainedListItem>
          );
        })}
      </ContainedList>
      {reassurance ? (
        <InlineNotification
          kind="info"
          lowContrast
          hideCloseButton
          title="Support team ready"
          subtitle={reassurance}
        />
      ) : null}
    </div>
  );
}
