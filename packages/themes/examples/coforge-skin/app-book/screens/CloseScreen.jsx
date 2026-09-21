/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, Tag, Tile } from '../../app/carbon';
import { CompanionNav } from './CompanionNav';

export function CloseScreen({ onOpen, onHome }) {
  return (
    <>
      <h1>Welcome home</h1>
      <p>
        Kraków week completed · 25 Sep. This screen does not invent live stats.
      </p>
      <CompanionNav current="close" onOpen={onOpen} />
      <Tile>
        <p>Duration · 8 days</p>
        <p>Venues · Hotel Stary, Wieliczka, Old Town</p>
        <p>All pedestrian notes were labelled accessible where verified.</p>
      </Tile>
      <p>How accessible was Kraków?</p>
      <Tag type="outline" size="sm">
        Feedback trains routes — anonymous
      </Tag>
      <p>
        <Button kind="primary" size="lg" onClick={onHome}>
          Plan your next trip
        </Button>
      </p>
    </>
  );
}
