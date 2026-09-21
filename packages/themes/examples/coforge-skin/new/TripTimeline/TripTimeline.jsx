/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ContainedList, ContainedListItem, Tag } from '../../app/carbon';

export function TripTimeline({ days }) {
  return (
    <div className="luma-trip-timeline">
      {days.map((day) => (
        <ContainedList
          key={day.date}
          label={`${day.dayLabel} ${day.date} · Day ${day.dayNumber}`}
          kind="on-page">
          {day.events.map((event, index) => (
            <ContainedListItem key={`${day.date}-${index}`}>
              <span className="luma-job-door__meta">{event.time}</span>{' '}
              <Tag type="outline" size="sm">
                {event.type}
              </Tag>
              <p>
                <strong>{event.title}</strong>
                {event.location ? ` · ${event.location}` : ''}
              </p>
              {event.notes ? <p>{event.notes}</p> : null}
              {event.access ? (
                <Tag type="outline" size="sm">
                  {event.access}
                </Tag>
              ) : null}
            </ContainedListItem>
          ))}
        </ContainedList>
      ))}
    </div>
  );
}
