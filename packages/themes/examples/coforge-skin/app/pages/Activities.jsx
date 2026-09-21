/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Column, Grid, Tile, Tag, InlineNotification, Stack } from '../carbon';

export function ActivitiesPage() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={6}>
          <div className="luma-masthead">
            <p className="luma-masthead__kicker">On the itinerary</p>
            <h1>Activities</h1>
            <p>Access-gated stops already on the plan. Not a marketplace.</p>
          </div>
          <InlineNotification
            kind="info"
            lowContrast
            hideCloseButton
            title="ASSUMPTION"
            subtitle="Stops as itinerary lines. Not SKUs."
          />
          <Tile>
            <Stack gap={4}>
              <Tag type="outline" size="md">
                On itinerary
              </Tag>
              <h2>Old Town walking route</h2>
              <p>No Book, no SKU, no checkout.</p>
            </Stack>
          </Tile>
        </Stack>
      </Column>
    </Grid>
  );
}
