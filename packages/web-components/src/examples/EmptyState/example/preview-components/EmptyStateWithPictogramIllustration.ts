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
import { carbonIconToSVG, type CarbonIcon } from '../../../globals/internal/icon-loader-utils';

import {
  Container,
  DoNot_02,
  Warning_01,
  Reliability,
  Lock_02,
  Gear,
  Reset,
  Availability,
  CloudBuilderProfessionalServices,
  DoNot,
  VisualInspection,
  Slider,
} from '@carbon/pictograms';

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
    // width/height override the descriptor's hard-coded 64px values so CSS controls sizing.
    const svgString = carbonIconToSVG(descriptor as CarbonIcon, {
      fill: 'currentColor',
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
