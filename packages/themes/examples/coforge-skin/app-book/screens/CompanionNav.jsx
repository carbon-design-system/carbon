/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '../../app/carbon';

const JOBS = [
  { id: 'itinerary', label: 'Diary' },
  { id: 'documents', label: 'Documents' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'airport', label: 'Airport' },
  { id: 'assistance', label: 'Assistance' },
  { id: 'share', label: 'Share' },
  { id: 'group', label: 'Group' },
  { id: 'access', label: 'Access' },
  { id: 'close', label: 'Close trip' },
];

export function CompanionNav({ current, onOpen }) {
  return (
    <nav className="luma-companion-nav" aria-label="Trip jobs">
      {JOBS.map((job) => (
        <Button
          key={job.id}
          kind={job.id === current ? 'secondary' : 'ghost'}
          size="sm"
          type="button"
          onClick={() => onOpen(job.id)}>
          {job.label}
        </Button>
      ))}
    </nav>
  );
}
