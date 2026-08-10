/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '../../../src/components/Tabs/Tabs';
import { MotionContext } from '../../../src/internal/motion/MotionContext';
import { MotionItem } from '../../../src/internal/motion/MotionSurface';
import mdx from './Motion.mdx';
import './surfaces.stories.scss';

export default {
  title: 'Elements/Motion/Tabs',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

function Row({ label, value, description }) {
  return (
    <MotionItem surface="contextual" className="motion-context-demo__row">
      <span className="motion-context-demo__row-label">{label}</span>
      <span className="motion-context-demo__row-value">{value}</span>
      <span className="motion-context-demo__row-description">
        {description}
      </span>
    </MotionItem>
  );
}

const panels = [
  {
    label: 'Overview',
    rows: [
      {
        label: 'Status',
        value: 'Active',
        description: 'Service is running normally',
      },
      {
        label: 'Region',
        value: 'us-south',
        description: 'Primary deployment region',
      },
      { label: 'Plan', value: 'Lite', description: '2 vCPUs · 4 GB RAM' },
      {
        label: 'Created',
        value: '2024-03-12',
        description: 'Initial provisioning date',
      },
    ],
  },
  {
    label: 'Network',
    rows: [
      {
        label: 'Endpoint',
        value: 'api.example.com',
        description: 'Public API endpoint',
      },
      {
        label: 'Protocol',
        value: 'HTTPS / TLS 1.3',
        description: 'Encryption in transit',
      },
      {
        label: 'Bandwidth',
        value: '1 Gbps',
        description: 'Maximum burst throughput',
      },
    ],
  },
  {
    label: 'Storage',
    rows: [
      {
        label: 'Volume',
        value: '256 GB',
        description: 'Allocated block storage',
      },
      { label: 'Used', value: '91 GB', description: '35% capacity utilised' },
      {
        label: 'Snapshots',
        value: '4',
        description: 'Retained recovery points',
      },
      {
        label: 'Encryption',
        value: 'AES-256',
        description: 'At-rest encryption standard',
      },
    ],
  },
];

// ── Story ─────────────────────────────────────────────────────────────────────
//
// How the animation is gated per-panel:
//
//   Tabs is controlled — `selectedIndex` lives in story state.
//   Each TabPanel's <MotionContext> receives a `key={selectedIndex}` so it
//   remounts (and re-runs the stagger) only when that panel becomes active.
//   Hidden panels have their MotionContext remounted from the previous key,
//   but because they are `hidden` in the DOM their motion.divs are not
//   visible, so the animation is a no-op until the panel is shown next.
//
// Stagger math (stagger={50}, 4 children):
//   child 0 → settle =  0 ms → delay: 0.000 s
//   child 1 → settle = 50 ms → delay: 0.050 s
//   child 2 → settle =100 ms → delay: 0.100 s
//   child 3 → settle =150 ms → delay: 0.150 s
//
// Note: once TabPanel is wired as a MotionContext provider (planned), the
// settle baseline will shift to 150 ms (disclosure surface, moderate-01) and
// all delays will offset from that automatically — no change needed here.

export const TabsWithStagger = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="motion-context-demo">
      <Tabs
        selectedIndex={selectedIndex}
        onChange={({ selectedIndex: i }) => setSelectedIndex(i)}>
        <TabList aria-label="Resource tabs">
          {panels.map((p) => (
            <Tab key={p.label}>{p.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {panels.map((panel) => (
            <TabPanel key={panel.label}>
              {/*
               * key={selectedIndex} remounts MotionContext — and therefore all
               * AnimatedRow children — each time this panel becomes the active
               * one, re-triggering the scale-in stagger from the top.
               */}
              <MotionContext key={selectedIndex} stagger={50}>
                {panel.rows.map((row) => (
                  <Row key={row.label} {...row} />
                ))}
              </MotionContext>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

TabsWithStagger.storyName = 'Tabs — staggered content with MotionContext';
