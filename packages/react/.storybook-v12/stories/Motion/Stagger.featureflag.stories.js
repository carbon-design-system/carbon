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
import { Accordion, AccordionItem } from '../../../src/components/Accordion';
import { MotionContext } from '../../../src/internal/motion/MotionContext';
import { MotionItem } from '../../../src/internal/motion/MotionSurface';
import mdx from './Motion.mdx';
import './surfaces.stories.scss';

const args = {
  settle: 0,
  stagger: 50,
};

const argTypes = {
  settle: {
    description:
      'Duration (in milliseconds) motion waits before the staggered animation. This can be set to make sure parent component animation finishes before triggering the staggered children animation',
    control: {
      type: 'number',
    },
  },
  stagger: {
    description: 'Duration (in milliseconds) between each staggered animation',
    control: {
      type: 'number',
    },
  },
};

export default {
  title: 'Elements/Motion/Stagger',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args,
  argTypes,
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

// ── Tabs story ─────────────────────────────────────────────────────────────────
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

const tabPanels = [
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

export const TabsWithStagger = (args) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="motion-context-demo">
      <Tabs
        selectedIndex={selectedIndex}
        onChange={({ selectedIndex: i }) => setSelectedIndex(i)}>
        <TabList aria-label="Resource tabs">
          {tabPanels.map((p) => (
            <Tab key={p.label}>{p.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabPanels.map((panel) => (
            <TabPanel key={panel.label}>
              {/*
               * key={selectedIndex} remounts MotionContext — and therefore all
               * MotionItem children — each time this panel becomes the active
               * one, re-triggering the scale-in stagger from the top.
               */}
              <MotionContext key={selectedIndex} {...args}>
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

// ── Accordion story ────────────────────────────────────────────────────────────
//
// How the animation is gated per-item:
//
//   AccordionItem is uncontrolled — open state lives inside AccordionItem.
//   Each item tracks its own `openCount` via onHeadingClick so that
//   MotionContext receives a fresh `key` each time the item opens,
//   re-mounting the context and re-running the stagger from the top.
//   When the item closes, the rows unmount with it, so no clean-up needed.

const accordionSections = [
  {
    title: 'Service details',
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
    ],
  },
  {
    title: 'Network',
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
    title: 'Storage',
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
    ],
  },
];

function AccordionSectionItem({ title, rows }) {
  // Increment on each open so MotionContext remounts and restarts the stagger.
  const [openCount, setOpenCount] = useState(0);

  return (
    <AccordionItem
      title={title}
      onHeadingClick={({ isOpen }) => {
        if (isOpen) {
          setOpenCount((n) => n + 1);
        }
      }}>
      {/*
       * key={openCount} remounts MotionContext each time this item opens,
       * re-triggering the staggered scale-in for every row inside it.
       * settle={110} offsets the stagger past the accordion's own expand
       * transition ($duration-fast-02 = 110 ms) so rows animate in after
       * the panel has landed rather than racing it.
       */}
      <MotionContext key={openCount} settle={110} stagger={50}>
        {rows.map((row) => (
          <Row key={row.label} {...row} />
        ))}
      </MotionContext>
    </AccordionItem>
  );
}

export const AccordionWithStagger = () => (
  <div className="motion-context-demo">
    <Accordion>
      {accordionSections.map((section) => (
        <AccordionSectionItem
          key={section.title}
          title={section.title}
          rows={section.rows}
        />
      ))}
    </Accordion>
  </div>
);

AccordionWithStagger.storyName =
  'Accordion — staggered content with MotionContext';
