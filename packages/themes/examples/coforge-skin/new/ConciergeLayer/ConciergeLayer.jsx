/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  HeaderGlobalAction,
  HeaderPanel,
  Switcher,
  SwitcherItem,
} from '../../app/carbon';
import { Chat } from '@carbon/icons-react';
import { href } from '../../app/useHashLocation';

const JUMPS = [
  {
    id: 'concierge-hotels',
    label: 'Hotels — published access',
    path: '/hotels',
  },
  {
    id: 'concierge-tickets',
    label: 'Tickets — flight on itinerary',
    path: '/tickets',
  },
  {
    id: 'concierge-activities',
    label: 'Activities',
    path: '/activities',
  },
  {
    id: 'concierge-itinerary',
    label: 'Itinerary',
    path: '/itinerary',
  },
  {
    id: 'concierge-airport',
    label: 'Airport sequence',
    path: '/airport',
  },
];

function ConciergeAction({ expanded, onToggle }) {
  return (
    <HeaderGlobalAction
      id="concierge"
      aria-label="Concierge"
      isActive={expanded}
      onClick={onToggle}>
      <Chat size={20} />
    </HeaderGlobalAction>
  );
}

function ConciergePanel({ expanded, onNavigate }) {
  return (
    <HeaderPanel expanded={expanded} href="#concierge" aria-label="Concierge">
      <Switcher aria-label="Jump to a job" expanded={expanded}>
        {JUMPS.map((jump) => (
          <SwitcherItem
            key={jump.id}
            aria-label={jump.label}
            href={href(jump.path)}
            onClick={onNavigate}>
            {jump.label}
          </SwitcherItem>
        ))}
      </Switcher>
    </HeaderPanel>
  );
}

export function ConciergeLayer({ expanded, onToggle, onNavigate }) {
  return (
    <>
      <ConciergeAction expanded={expanded} onToggle={onToggle} />
      <ConciergePanel expanded={expanded} onNavigate={onNavigate} />
    </>
  );
}

ConciergeLayer.Action = ConciergeAction;
ConciergeLayer.Panel = ConciergePanel;
