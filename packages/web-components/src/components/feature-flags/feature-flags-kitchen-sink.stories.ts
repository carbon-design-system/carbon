/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../overflow-menu/overflow-menu';
import '../overflow-menu/overflow-menu-body';
import '../overflow-menu/overflow-menu-item';
import '../tile/index';
import '../toggle/index';
import '../structured-list/index';
import { prefix } from '../../globals/settings';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';

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

const badges = {
  logs: ['LOGS', '#0f62fe'],
  visual: ['VISUAL ONLY', '#8a3ffc'],
};

const section = (kind: 'logs' | 'visual', title, flag, note, content) => {
  const [label, color] = badges[kind];
  return html`
    <section style="margin-bottom:2.5rem;max-width:30rem">
      <div style="display:flex;align-items:center;gap:0.5rem">
        <span
          style="background:${color};color:#fff;font-size:0.625rem;padding:0.125rem 0.375rem;border-radius:2px">
          ${label}
        </span>
        <h4 style="margin:0">${title}</h4>
      </div>
      <code style="display:block;margin:0.25rem 0;font-size:0.75rem">
        ${flag}
      </code>
      <p style="margin:0 0 0.75rem;font-size:0.75rem;color:#525252">${note}</p>
      ${content}
    </section>
  `;
};

/**
 * Components render without a `<feature-flags>` wrapper on purpose. That is the
 * path where `isFeatureFlagEnabled` resolves to `false` without ever reaching a
 * scope, which is what a real consumer hits. The v12 storybook wraps every story
 * for you, so this same story is the silent case there.
 */
export const KitchenSink = {
  render: () => html`
    <div style="padding:1rem">
      <p style="margin-bottom:2rem;max-width:38rem;font-size:0.875rem">
        <strong>LOGS</strong> — flag is read in JavaScript, so it prints a
        console notice on v11 and stays silent on v12.
        <strong>VISUAL ONLY</strong> — flag is read in Sass, never in
        JavaScript, so it can never log. Compare the rendering between the v11
        and v12 storybooks instead.
      </p>

      ${section(
        'logs',
        'cds-overflow-menu',
        'enable-v12-overflowmenu',
        'Logs on render. This component also reads enable-v12-dynamic-floating-styles, but that flag can never be reported in Web Components: it is only read from _syncMenuChild(), which returns early unless a `cds-menu` child exists — and that child only exists once enable-v12-overflowmenu is already on. By then the floating flag is on too, so there is nothing to report. React reads it unconditionally and does log it.',
        html`<cds-overflow-menu>
          ${iconLoader(OverflowMenuVertical16, {
            class: `${prefix}--overflow-menu__icon`,
            slot: 'icon',
          })}
          <span slot="tooltip-content">Options</span>
          <cds-overflow-menu-body>
            <cds-overflow-menu-item>Item one</cds-overflow-menu-item>
            <cds-overflow-menu-item>Item two</cds-overflow-menu-item>
          </cds-overflow-menu-body>
        </cds-overflow-menu>`
      )}
      ${section(
        'logs',
        'cds-clickable-tile',
        'enable-v12-tile-default-icons',
        'Renders default icons in v12.',
        html`<cds-clickable-tile href="#">Clickable tile</cds-clickable-tile>`
      )}
      ${section(
        'logs',
        'cds-radio-tile',
        'enable-v12-tile-radio-icons',
        'Renders radio icons in v12.',
        html`<cds-tile-group name="kitchen-sink-radio">
          <cds-radio-tile value="one">Option one</cds-radio-tile>
          <cds-radio-tile value="two">Option two</cds-radio-tile>
        </cds-tile-group>`
      )}
      ${section(
        'visual',
        'cds-structured-list',
        'enable-v12-structured-list-visible-icons',
        'Sass only. v12 shows the selection icons without needing hover or focus. Use selection-name on cds-structured-list and selection-value on each row — the component renders the input and icon automatically.',
        html`<cds-structured-list selection-name="kitchen-sink-sl">
          <cds-structured-list-head>
            <cds-structured-list-header-row>
              <cds-structured-list-header-cell
                >ColumnA</cds-structured-list-header-cell
              >
              <cds-structured-list-header-cell
                >ColumnB</cds-structured-list-header-cell
              >
              <cds-structured-list-header-cell
                >ColumnC</cds-structured-list-header-cell
              >
            </cds-structured-list-header-row>
          </cds-structured-list-head>
          <cds-structured-list-body>
            <cds-structured-list-row selection-value="row-0">
              <cds-structured-list-cell>Row 0</cds-structured-list-cell>
              <cds-structured-list-cell>Row 0</cds-structured-list-cell>
              <cds-structured-list-cell
                >Lorem ipsum dolor sit amet</cds-structured-list-cell
              >
            </cds-structured-list-row>
            <cds-structured-list-row selection-value="row-1">
              <cds-structured-list-cell>Row 1</cds-structured-list-cell>
              <cds-structured-list-cell>Row 1</cds-structured-list-cell>
              <cds-structured-list-cell
                >Lorem ipsum dolor sit amet</cds-structured-list-cell
              >
            </cds-structured-list-row>
            <cds-structured-list-row selection-value="row-2">
              <cds-structured-list-cell>Row 2</cds-structured-list-cell>
              <cds-structured-list-cell>Row 2</cds-structured-list-cell>
              <cds-structured-list-cell
                >Lorem ipsum dolor sit amet</cds-structured-list-cell
              >
            </cds-structured-list-row>
          </cds-structured-list-body>
        </cds-structured-list>`
      )}
      ${section(
        'visual',
        'cds-toggle',
        'enable-v12-toggle-reduced-label-spacing',
        'Sass only. v12 reduces the gap between the control and its label.',
        html`<cds-toggle label-text="Toggle"></cds-toggle>`
      )}
    </div>
  `,
};
