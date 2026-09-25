/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import '../components/EmptyState';

// ─── @carbon/pictograms imports ──────────────────────────────────────────────
// Same mappings as the React EmptyStateWithPictogramIllustration:
//   'First use'    → Container
//   'Error'        → DoNot_02  (do-not--02)
//   'Warning'      → Warning_01 (warning--01)
//   'Success'      → Reliability
//   'No access'    → Lock_02   (lock--02)
//   'Prerequisites'→ Gear
//   'Retry'        → Reset
//   'Offline'      → Availability
//   'Maintenance'  → CloudBuilderProfessionalServices (cloud--builder--professional--services)
//   'Unavailable'  → DoNot
//   'Search'       → VisualInspection (visual--inspection)
//   'Filtered'     → Slider
import Container from '@carbon/pictograms/es/container/index.js';
import DoNot_02 from '@carbon/pictograms/es/do-not--02/index.js';
import Warning_01 from '@carbon/pictograms/es/warning--01/index.js';
import Reliability from '@carbon/pictograms/es/reliability/index.js';
import Lock_02 from '@carbon/pictograms/es/lock--02/index.js';
import Gear from '@carbon/pictograms/es/gear/index.js';
import Reset from '@carbon/pictograms/es/reset/index.js';
import Availability from '@carbon/pictograms/es/availability/index.js';
import CloudBuilderProfessionalServices from '@carbon/pictograms/es/cloud--builder--professional--services/index.js';
import DoNot from '@carbon/pictograms/es/do-not/index.js';
import VisualInspection from '@carbon/pictograms/es/visual--inspection/index.js';
import Slider from '@carbon/pictograms/es/slider/index.js';

// ─── Minimal SVG serialiser (no external deps) ──────────────────────────────
// Adapted from @carbon/icon-helpers. Works with @carbon/pictograms descriptors.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _elementToSVG(child: any): string {
  if (typeof child === 'string') return child;
  const attrs = Object.entries(child.attrs ?? {})
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  const inner = (child.content ?? []).map(_elementToSVG).join('');
  return `<${child.elem}${attrs ? ' ' + attrs : ''}>${inner}</${child.elem}>`;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _descriptorToSVG(descriptor: any, extraAttrs: Record<string, string> = {}): string {
  const d = descriptor?.default ?? descriptor;
  // Start from descriptor attrs, but drop width/height so CSS (block-size/inline-size)
  // controls the rendered size. Ensure fill is currentColor so the pictogram respects
  // the theme text colour, matching the React implementation.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width: _w, height: _h, ...baseAttrs } = d.attrs ?? {};
  const attrs = { fill: 'currentColor', ...baseAttrs, ...extraAttrs };
  const attrStr = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  const inner = (d.content ?? []).map(_elementToSVG).join('');
  return `<svg ${attrStr}>${inner}</svg>`;
}

export type PictogramKey =
  | 'First use'
  | 'Error'
  | 'Warning'
  | 'Success'
  | 'No access'
  | 'Prerequisites'
  | 'Retry'
  | 'Offline'
  | 'Maintenance'
  | 'Unavailable'
  | 'Search'
  | 'Filtered';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pictogramMap: Record<PictogramKey, any> = {
  'First use': Container,
  Error: DoNot_02,
  Warning: Warning_01,
  Success: Reliability,
  'No access': Lock_02,
  Prerequisites: Gear,
  Retry: Reset,
  Offline: Availability,
  Maintenance: CloudBuilderProfessionalServices,
  Unavailable: DoNot,
  Search: VisualInspection,
  Filtered: Slider,
};

const blockClass = 'cds--empty-state';

/**
 * `cds-empty-state-pictogram`
 *
 * Preview component — wraps `cds-empty-state` with a Carbon pictogram illustration.
 * The pictogram SVG is rendered inline and inherits the current text colour via
 * `fill: currentColor`, matching the React implementation.
 *
 * @element cds-empty-state-pictogram
 */
@customElement('cds-empty-state-pictogram')
export class CDSEmptyStatePictogram extends LitElement {
  /** Pictogram key to display. @default 'First use' */
  @property({ attribute: 'pictogram-key' })
  pictogramKey: PictogramKey = 'First use';

  /** Size variant. @default 'md' */
  @property({ reflect: true })
  size: 'md' | 'sm' = 'md';

  /** Main heading. */
  @property()
  heading = 'Get started by adding an asset';

  /** Subtitle. */
  @property()
  subtitle =
    'Unlock product insights by adding assets from your system or cloud environment.';

  /** Action button label. */
  @property({ attribute: 'action-text' })
  actionText = 'Add asset';

  /** Link label. */
  @property({ attribute: 'link-text' })
  linkText = 'Learn more';

  /** Link href. */
  @property({ attribute: 'link-href' })
  linkHref = 'https://carbondesignsystem.com/patterns/empty-states-pattern/';

  protected createRenderRoot() {
    return this;
  }

  render() {
    const { pictogramKey, size, heading, subtitle, actionText, linkText, linkHref } = this;
    const descriptor = pictogramMap[pictogramKey] ?? pictogramMap['First use'];
    // Render the pictogram as an inline SVG. The size class gives it the
    // correct block-size / inline-size from _empty-state.scss.
    const svgString = _descriptorToSVG(descriptor, {
      width: '100%',
      height: '100%',
      style: 'display:block',
      'aria-label': heading,
      role: 'img',
    });

    return html`
      <cds-empty-state
        size="${size}"
        heading="${heading}"
        subtitle="${subtitle}"
        action-text="${actionText}"
        action-kind="tertiary"
        link-text="${linkText}"
        link-href="${linkHref}">
        <span
          slot="illustration"
          class="${blockClass}__illustration--${size}">
          ${unsafeSVG(svgString)}
        </span>
      </cds-empty-state>
    `;
  }
}

export default CDSEmptyStatePictogram;
