/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '../../app/carbon';
import { ActivityOffer } from '../../new/ActivityOffer/ActivityOffer';
import { activities } from '../data/activities';

export function ActivityResultsScreen({
  selectedActivities,
  addActivity,
  onContinue,
}) {
  const selectedIds = new Set(selectedActivities.map((a) => a.id));
  return (
    <>
      <h1>Things to do</h1>
      <p>
        Prices are for 8 guests. Add one or more, then continue to your trip.
      </p>
      {activities.map((activity) => (
        <ActivityOffer
          key={activity.id}
          activity={activity}
          selected={selectedIds.has(activity.id)}
          onSelect={addActivity}
        />
      ))}
      <Button kind="primary" size="lg" onClick={onContinue}>
        Continue to trip
      </Button>
    </>
  );
}
