/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

// `OverflowMenu` is imported from the component index on purpose. The index is
// the dispatcher that reads `enable-v12-overflowmenu`; importing `./OverflowMenu`
// reaches the v11 implementation directly and never checks the flag.
import { OverflowMenu } from '../OverflowMenu';
import { default as OverflowMenuItem } from '../OverflowMenuItem';
import { ClickableTile } from '../Tile';
import { default as RadioTile } from '../RadioTile';
import { TileGroup } from '../TileGroup';
import { CheckmarkFilled } from '@carbon/icons-react';
const prefix = 'cds';
import { default as Dropdown } from '../Dropdown';
import { ComposedModal, ModalBody, ModalHeader } from '../ComposedModal';
import { default as Button } from '../Button';
import { default as Toggle } from '../Toggle';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from '../StructuredList';

export default {
  title: 'Components/FeatureFlags/Kitchen Sink',
  parameters: {
    docs: {
      description: {
        component:
          'Renders every component behind a v12 feature flag in one place. ' +
          'Open the console and filter for `@carbon/feature-flags`.',
      },
    },
  },
};

const Section = ({ kind, title, flag, note, children }) => {
  const color = { logs: '#0f62fe', visual: '#8a3ffc', silent: '#6f6f6f' }[kind];
  const label = { logs: 'LOGS', visual: 'VISUAL ONLY', silent: 'NO LOG' }[kind];

  return (
    <section style={{ marginBottom: '2.5rem', maxWidth: '30rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span
          style={{
            background: color,
            color: '#fff',
            fontSize: '0.625rem',
            padding: '0.125rem 0.375rem',
            borderRadius: '2px',
          }}>
          {label}
        </span>
        <h4 style={{ margin: 0 }}>{title}</h4>
      </div>
      <code
        style={{ display: 'block', margin: '0.25rem 0', fontSize: '0.75rem' }}>
        {flag}
      </code>
      <p
        style={{
          margin: '0 0 0.75rem',
          fontSize: '0.75rem',
          color: '#525252',
        }}>
        {note}
      </p>
      {children}
    </section>
  );
};

const items = [
  { id: 'a', text: 'Option A' },
  { id: 'b', text: 'Option B' },
];

export const KitchenSink = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <p
        style={{
          marginBottom: '2rem',
          maxWidth: '38rem',
          fontSize: '0.875rem',
        }}>
        <strong>LOGS</strong> — flag is read in JavaScript, so it prints a
        console notice on v11 and stays silent on v12.{' '}
        <strong>VISUAL ONLY</strong> — flag is read in Sass, never in
        JavaScript, so it can never log. Compare the rendering between the v11
        and v12 storybooks instead. <strong>NO LOG</strong> — not a v12 flag, so
        it is intentionally never announced.
      </p>

      <Section
        kind="logs"
        title="OverflowMenu"
        flag="enable-v12-overflowmenu"
        note="Uses the Menu subcomponents in v12.">
        <OverflowMenu aria-label="overflow-menu">
          <OverflowMenuItem itemText="Item one" />
          <OverflowMenuItem itemText="Item two" />
        </OverflowMenu>
      </Section>

      <Section
        kind="logs"
        title="Dropdown"
        flag="enable-v12-dynamic-floating-styles"
        note="Floating UI drives positioning in v12.">
        <Dropdown
          id="kitchen-sink-dropdown"
          titleText="Dropdown"
          label="Choose an option"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </Section>

      <Section
        kind="logs"
        title="ClickableTile"
        flag="enable-v12-tile-default-icons"
        note="Renders a default arrow icon in v12.">
        <ClickableTile id="kitchen-sink-clickable" href="#">
          Clickable tile
        </ClickableTile>
      </Section>

      <Section
        kind="logs"
        title="RadioTile"
        flag="enable-v12-tile-radio-icons"
        note="Renders radio icons in v12.">
        <TileGroup name="kitchen-sink-radio" legend="RadioTile group">
          <RadioTile id="kitchen-sink-radio-1" value="one">
            Option one
          </RadioTile>
          <RadioTile id="kitchen-sink-radio-2" value="two">
            Option two
          </RadioTile>
        </TileGroup>
      </Section>

      <Section
        kind="logs"
        title="ComposedModal"
        flag="enable-focus-wrap-without-sentinels"
        note="A v12 flag without the enable-v12- prefix. Open the modal and tab to the end.">
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <ComposedModal open={open} onClose={() => setOpen(false)}>
          <ModalHeader title="Kitchen sink modal" />
          <ModalBody>
            <p>Tab through to exercise focus wrapping.</p>
          </ModalBody>
        </ComposedModal>
      </Section>

      <Section
        kind="visual"
        title="ClickableTile"
        flag="enable-tile-contrast"
        note="Sass only. v11: no border. v12: 1px border. Nothing is logged for this flag.">
        <ClickableTile id="kitchen-sink-clickable" href="#">
          A border around this tile means enable-tile-contrast is on
        </ClickableTile>
      </Section>

      <Section
        kind="visual"
        title="StructuredList (old API)"
        flag="enable-v12-structured-list-visible-icons"
        note="Old API: StructuredListRow with no selection prop. Requires a manual StructuredListCell containing CheckmarkFilled.">
        <StructuredListWrapper selection>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>ColumnA</StructuredListCell>
              <StructuredListCell head>ColumnB</StructuredListCell>
              <StructuredListCell head>ColumnC</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {['row-0', 'row-1', 'row-2'].map((value, i) => (
              <StructuredListRow key={value}>
                <StructuredListCell>Row {i}</StructuredListCell>
                <StructuredListCell>Row {i}</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet
                </StructuredListCell>
                <StructuredListInput
                  id={`kitchen-sink-list-old-${i}`}
                  value={value}
                  title={value}
                  name="kitchen-sink-list-old"
                  aria-label={value}
                />
                <StructuredListCell>
                  <CheckmarkFilled
                    className={`${prefix}--structured-list-svg`}
                    aria-label="select an option">
                    <title>select an option</title>
                  </CheckmarkFilled>
                </StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </Section>

      <Section
        kind="visual"
        title="StructuredList (new API)"
        flag="enable-v12-structured-list-visible-icons"
        note="New API: add selection to StructuredListRow. The icon cell is rendered automatically — no CheckmarkFilled needed.">
        <StructuredListWrapper selection>
          <StructuredListHead>
            <StructuredListRow head selection>
              <StructuredListCell head>ColumnA</StructuredListCell>
              <StructuredListCell head>ColumnB</StructuredListCell>
              <StructuredListCell head>ColumnC</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {['row-0', 'row-1', 'row-2'].map((value, i) => (
              <StructuredListRow key={value} selection>
                <StructuredListCell>Row {i}</StructuredListCell>
                <StructuredListCell>Row {i}</StructuredListCell>
                <StructuredListCell>
                  Lorem ipsum dolor sit amet
                </StructuredListCell>
                <StructuredListInput
                  id={`kitchen-sink-list-new-${i}`}
                  value={value}
                  title={value}
                  name="kitchen-sink-list-new"
                  aria-label={value}
                />
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </Section>

      <Section
        kind="visual"
        title="Toggle"
        flag="enable-v12-toggle-reduced-label-spacing"
        note="Sass only. v12 reduces the gap between the control and its label.">
        <Toggle id="kitchen-sink-toggle" labelText="Toggle" />
      </Section>
    </div>
  );
};
