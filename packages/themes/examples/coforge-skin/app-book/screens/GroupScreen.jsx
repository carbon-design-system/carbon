/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { GroupTrip } from '../../new/GroupTrip/GroupTrip';
import { DEMO_PASSENGERS } from '../tools';
import { GROUP_STOPS } from '../data/companion';
import { CompanionNav } from './CompanionNav';

export function GroupScreen({ onOpen }) {
  return (
    <>
      <h1>Kraków · family</h1>
      <p>18–25 Sep · 8 members. Guest view cannot edit the plan.</p>
      <CompanionNav current="group" onOpen={onOpen} />
      <GroupTrip
        title="Madrid to Kraków"
        subtitle="18–25 Sep 2026 · read-only"
        members={DEMO_PASSENGERS.map((p) => ({
          name: `${p.firstName} ${p.lastName}`,
        }))}
        stops={GROUP_STOPS}
      />
    </>
  );
}
