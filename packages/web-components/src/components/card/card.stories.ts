/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import Analytics16 from '@carbon/icons/es/analytics/16.js';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16.js';
import Bee16 from '@carbon/icons/es/bee/16.js';
import Bee24 from '@carbon/icons/es/bee/24.js';
import Copy16 from '@carbon/icons/es/copy/16.js';
import Download16 from '@carbon/icons/es/download/16.js';
import Edit16 from '@carbon/icons/es/edit/16.js';
import Favorite16 from '@carbon/icons/es/favorite/16.js';
import Favorite32 from '@carbon/icons/es/favorite/32.js';
import Notification16 from '@carbon/icons/es/notification/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';
import Share16 from '@carbon/icons/es/share/16.js';
import TrashCan16 from '@carbon/icons/es/trash-can/16.js';
import View16 from '@carbon/icons/es/view/16.js';
import './index';
import '../ai-label';
import '../button';
import '../grid/index';
import '../icon-button';
import '../tag';
import '../icon-indicator';
import storyDocs from './card.mdx';
import styles from './card-story.scss?lit';
import illustration1 from './_story-assets/illustration-img-1.png';
import placeholder16x9Src from './_story-assets/placeholder-16x9.svg';
import placeholder1x1Src from './_story-assets/placeholder-1x1.svg';
import rebusClassic from './_story-assets/classic-rebus.png';

// ─── Shared content helpers ──────────────────────────────────────────────────

const placeholder16x9 = placeholder16x9Src;
const placeholder1x1 = placeholder1x1Src;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Preview/Card',
  parameters: {
    docs: { page: storyDocs },
    layout: 'fullscreen',
  },
  argTypes: {
    density: {
      control: { type: 'select' },
      options: ['productive', 'expressive'],
      description:
        'Density variant: productive uses heading-compact-02, expressive uses heading-03',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Makes the entire card clickable',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the card and all interactive elements',
    },
    horizontal: {
      control: { type: 'boolean' },
      description:
        'Horizontal layout: media on the left, content stacked on the right',
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label rendered above the title (cds-card-title)',
    },
    title: {
      control: { type: 'text' },
      description: 'Title text (cds-card-title children)',
    },
    description: {
      control: { type: 'text' },
      description:
        'Optional description rendered below the title (cds-card-title)',
    },
    bodyText: {
      control: { type: 'text' },
      description: 'Body copy (cds-card-body children)',
    },
    titleTruncate: {
      control: { type: 'boolean' },
      description: 'Truncate the title text with an ellipsis when it overflows',
    },
    actionCount: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description:
        'Number of icon-button actions in the card header (0 = no actions). Demonstrates overflow when actions exceed available space.',
    },
  },
  args: {
    density: 'productive',
    clickable: false,
    disabled: false,
    horizontal: false,
    label: 'Example',
    title: 'Card title',
    description: '',
    bodyText: 'Use the controls panel to customise this card.',
    titleTruncate: false,
    actionCount: 0,
  },
};

export default meta;

// ─── Readonly argTypes (locks controls for showcase stories) ──────────────────

const readonlyArgTypes = {
  density: { control: false },
  clickable: { control: false },
  disabled: { control: false },
  horizontal: { control: false },
  label: { control: false },
  title: { control: false },
  description: { control: false },
  bodyText: { control: false },
  titleTruncate: { control: false },
  actionCount: { control: false },
};

// Icons cycled through when actionCount > 0 in the Default story.
const _defaultActionIcons = [
  { icon: Edit16, label: 'Edit' },
  { icon: Share16, label: 'Share' },
  { icon: Download16, label: 'Download' },
  { icon: Favorite16, label: 'Favorite' },
  { icon: Copy16, label: 'Copy' },
  { icon: Settings16, label: 'Settings' },
  { icon: Analytics16, label: 'Analytics' },
  { icon: Notification16, label: 'Notification' },
  { icon: View16, label: 'View' },
  { icon: TrashCan16, label: 'Delete' },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default = {
  render: ({
    label,
    title,
    description,
    bodyText,
    titleTruncate,
    actionCount,
    ...cardArgs
  }) => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card
          density=${ifDefined(cardArgs.density || undefined)}
          ?clickable=${cardArgs.clickable}
          ?disabled=${cardArgs.disabled}
          ?horizontal=${cardArgs.horizontal}
          aria-label=${title || 'Default card example'}>
          <cds-card-media ratio="16x9">
            <img src=${placeholder16x9} alt="" style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title
              label=${ifDefined(label || undefined)}
              description=${ifDefined(description || undefined)}
              ?title-truncate=${titleTruncate}>
              ${title}
            </cds-card-title>
            ${actionCount > 0
              ? html`
                  <cds-card-actions>
                    ${_defaultActionIcons.slice(0, actionCount).map(
                      ({ icon, label: actionLabel }) => html`
                        <cds-card-action label=${actionLabel}>
                          <cds-icon-button kind="ghost" size="sm">
                            ${iconLoader(icon, { slot: 'icon' })}
                            <span slot="tooltip-content">${actionLabel}</span>
                          </cds-icon-button>
                        </cds-card-action>
                      `
                    )}
                  </cds-card-actions>
                `
              : ''}
          </cds-card-header>
          <cds-card-body>${bodyText}</cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const Clickable = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Action card — click handler -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card clickable aria-label="View analytics report">
          <cds-card-media ratio="16x9">
            <img src=${placeholder16x9} alt="" style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title label="Analytics">Usage report</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Click anywhere on this card to trigger the action.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Navigation card — href link -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card
          clickable
          href="https://carbondesignsystem.com"
          aria-label="Open Carbon Design System in a new tab">
          <cds-card-media ratio="16x9">
            <img src=${placeholder16x9} alt="" style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title label="External link">
              Carbon Design System
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card renders as an <code>&lt;a&gt;</code> element for true
            navigation semantics. Right-click or Cmd+click to open in a new tab.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Custom footer icon override -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card clickable aria-label="Share this report">
          <cds-card-header>
            <cds-card-title label="Share">Share report</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Pass <code>footer-icon</code> slot to replace the default arrow with
            any icon.
          </cds-card-body>
          ${iconLoader(Share16, { slot: 'footer-icon', 'aria-hidden': 'true' })}
        </cds-card>
      </cds-column>

      <!-- Disabled clickable card -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card clickable disabled aria-label="Disabled card">
          <cds-card-header>
            <cds-card-title label="Status">Disabled card</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            When <code>disabled</code> is true the card is not interactive and
            the footer affordance is visually muted.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Expressive density -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card
          clickable
          density="expressive"
          aria-label="View product launch details">
          <cds-card-media ratio="16x9">
            <img src=${placeholder16x9} alt="" style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title label="Featured">Product launch</cds-card-title>
          </cds-card-header>
          <cds-card-body>Clickable card in expressive density.</cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Expressive link card -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card
          clickable
          density="expressive"
          href="#"
          aria-label="Read the quarterly review">
          <cds-card-header>
            <cds-card-title label="Report">Quarterly review</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Use <code>href</code> with <code>density="expressive"</code> for
            navigation cards in an editorial layout.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const Disabled = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card disabled>
          <cds-card-header>
            <cds-card-title>Card Title</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            When the card is disabled, pass the same state to all interactive
            elements inside — buttons, inputs, toggles, etc.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md" disabled>Action</cds-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="Download" kind="ghost" size="md" disabled>
                ${iconLoader(Download16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const Minimal = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-body>A minimal card with just body content.</cds-card-body>
        </cds-card>
      </cds-column>
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title>Card Title</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This is the card body content. It can contain any custom content you
            need.
          </cds-card-body>
          <cds-card-footer>
            <cds-button kind="tertiary" size="md">Action</cds-button>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const ProductiveAndExpressive = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              label="Category"
              description="Uses heading-compact-02">
              Productive Card
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Productive density uses compact headings (heading-compact-02) for a
            more condensed layout.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md">View details</cds-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
      <cds-column lg="4" md="4" sm="4">
        <cds-card density="expressive">
          <cds-card-header>
            <cds-card-title label="Category" description="Uses heading-03">
              Expressive Card
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Expressive density uses larger headings (heading-03) for a more
            spacious layout.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithFlushBody = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Default — 16px padding -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title>Default body</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            <div
              style="background:var(--cds-highlight);border:1px dashed var(--cds-link-primary);padding:1rem">
              Content with 16px body padding
            </div>
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- isFlush — 0px padding -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title>Flush body</cds-card-title>
          </cds-card-header>
          <cds-card-body is-flush>
            <div
              style="background:var(--cds-highlight);border:1px dashed var(--cds-link-primary);padding:1rem">
              Content fills edge-to-edge
            </div>
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithHeaderActions = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Two header icon actions + footer actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title label="Project" description="Due in 3 days">
              Website Redesign
            </cds-card-title>
            <cds-card-actions>
              <cds-card-action label="Edit">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete</span>
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            This card has action buttons in the header that prevent click
            propagation.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md">View report</cds-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="Share" kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="Download" kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- Ten icon actions → overflow collapses into menu -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              label="Category"
              description="Last updated 2 hours ago">
              Project dashboard
            </cds-card-title>
            <cds-card-actions>
              <cds-card-action label="Edit">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Favorite">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Favorite16, { slot: 'icon' })}
                  <span slot="tooltip-content">Favorite</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Analytics">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Analytics16, { slot: 'icon' })}
                  <span slot="tooltip-content">Analytics</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Share">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Share16, { slot: 'icon' })}
                  <span slot="tooltip-content">Share</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Download">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Download16, { slot: 'icon' })}
                  <span slot="tooltip-content">Download</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Settings">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Settings16, { slot: 'icon' })}
                  <span slot="tooltip-content">Settings</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Notification">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Notification16, { slot: 'icon' })}
                  <span slot="tooltip-content">Notification</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="View">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(View16, { slot: 'icon' })}
                  <span slot="tooltip-content">View</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Copy">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Copy16, { slot: 'icon' })}
                  <span slot="tooltip-content">Copy</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete</span>
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            Multiple action buttons in the header. Actions overflow into a menu
            automatically.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Single text action -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title>Usage metrics</cds-card-title>
            <cds-card-actions>
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">Action</cds-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            Text actions use Carbon's small ghost button for actions that
            require text labels instead of icons.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Multiple text actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title>Usage metrics</cds-card-title>
            <cds-card-actions>
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">Export</cds-button>
              </cds-card-action>
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">Share</cds-button>
              </cds-card-action>
              <cds-card-action>
                <cds-button kind="tertiary" size="sm">View report</cds-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>Multiple text actions in the header.</cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Truncated title + label + description alongside actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              label="Category"
              label-truncate
              description="This is a lengthy description that will be clamped to exactly two lines using multi-line truncation so you can see how it interacts with the action buttons above"
              description-truncate="2"
              title-truncate="2">
              This is a very long card title that wraps across multiple lines in
              a narrow container
            </cds-card-title>
            <cds-card-actions>
              <cds-card-action label="Edit">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Favorite">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Favorite16, { slot: 'icon' })}
                  <span slot="tooltip-content">Favorite</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Share">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Share16, { slot: 'icon' })}
                  <span slot="tooltip-content">Share</span>
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            Truncated label (single-line), long wrapping title, description
            clamped to 2 lines — all alongside header actions.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithHeaderMedia = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Icon + actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-header-media>
              ${iconLoader(Analytics16, { style: 'display:block' })}
            </cds-card-header-media>
            <cds-card-actions>
              <cds-card-action label="Edit">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete</span>
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
            <cds-card-title description="Real-time metrics">
              Analytics Dashboard
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card demonstrates the icon slot (first child) with action
            buttons on the right.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Image in header media -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-header-media>
              <img
                src=${illustration1}
                alt="A sample illustration"
                style="width:48px;height:48px;border-radius:4px" />
            </cds-card-header-media>
            <cds-card-title>Card with Image</cds-card-title>
          </cds-card-header>
          <cds-card-body
            >The icon slot can contain an image element.</cds-card-body
          >
        </cds-card>
      </cds-column>

      <!-- Tag in header media -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-header-media>
              <cds-tag type="blue">New</cds-tag>
            </cds-card-header-media>
            <cds-card-title>Card with Tag</cds-card-title>
          </cds-card-header>
          <cds-card-body
            >The icon slot can contain a Tag component.</cds-card-body
          >
        </cds-card>
      </cds-column>

      <!-- IconIndicator in header media -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-header-media>
              <cds-icon-indicator
                kind="succeeded"
                size="16"
                label="Succeeded"></cds-icon-indicator>
            </cds-card-header-media>
            <cds-card-title>Card with Status</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            The icon slot can contain an IconIndicator component.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithIcon = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Header media icon + footer with mixed actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-header-media>
              ${iconLoader(Analytics16, { style: 'display:block' })}
            </cds-card-header-media>
            <cds-card-title description="Real-time metrics">
              Analytics Dashboard
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card includes a small icon (16px) alongside the title.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md">View report</cds-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="Share" kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="View" kind="ghost" size="md">
                ${iconLoader(View16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="Download" kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- Larger 32px header media icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-header-media>
              ${iconLoader(Favorite32, { style: 'display:block' })}
            </cds-card-header-media>
            <cds-card-title description="Your saved content">
              Favorite Items
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card includes a larger icon (32px) for more prominence.
          </cds-card-body>
          <cds-card-footer>
            <cds-button kind="tertiary" size="md">Learn more</cds-button>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithMedia = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- 16x9 media + footer with status + icon action -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="16x9">
            <img
              src=${placeholder16x9}
              alt="Placeholder 16:9 ratio"
              style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title
              label="Featured"
              description="Join us for the big reveal">
              Product Launch Event
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card features a 16:9 aspect ratio media slot at the top.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-icon-button label="Share" kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- 1x1 square media + footer buttons -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="1x1">
            <img
              src=${placeholder1x1}
              alt="Placeholder 1:1 ratio"
              style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title description="Perfect for profile images">
              Square Format
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card uses a 1:1 (square) aspect ratio for the media.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md">Cancel</cds-button>
            </cds-card-action>
            <cds-card-action>
              <cds-button kind="secondary" size="md">
                Confirm ${iconLoader(ArrowRight16, { slot: 'icon' })}
              </cds-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithTitleLeadingIcon = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Productive density — 16px icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              >${iconLoader(Bee16, { slot: 'title-start' })}Analytics
              dashboard</cds-card-title
            >
          </cds-card-header>
          <cds-card-body>
            The leading icon adapts to the title size. In productive density,
            use 16px icons.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Expressive density — 24px icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card density="expressive">
          <cds-card-header>
            <cds-card-title
              >${iconLoader(Bee24, { slot: 'title-start' })}Analytics
              dashboard</cds-card-title
            >
          </cds-card-header>
          <cds-card-body>
            The leading icon adapts to the title size. In expressive density,
            use 24px icons.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Truncated multi-line title with leading icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title title-truncate="2"
              >${iconLoader(Bee16, { slot: 'title-start' })}Example of long
              title text that wraps onto two lines</cds-card-title
            >
          </cds-card-header>
          <cds-card-body>
            When the title wraps to multiple lines, the icon stays top-aligned
            with 2px padding to center with the first line.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithTitleMedia = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- 48px image -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title-media>
              <img
                src=${rebusClassic}
                alt="IBM Classic Rebus logo"
                style="width:48px;height:48px;display:block" />
            </cds-card-title-media>
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              Card with title icon
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            CardTitleMedia provides a media slot positioned to the left of the
            card title.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- 64px image -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title-media>
              <img
                src=${rebusClassic}
                alt="IBM Classic Rebus logo"
                style="width:64px;height:64px;display:block" />
            </cds-card-title-media>
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              Card with title icon
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            The media adapts to the heading area height (min 48px, max 64px).
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- 48px image + header actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title-media>
              <img
                src=${rebusClassic}
                alt="IBM Classic Rebus logo"
                style="width:48px;height:48px;display:block" />
            </cds-card-title-media>
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              Card with title icon
            </cds-card-title>
            <cds-card-actions>
              <cds-card-action label="Edit">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete</span>
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body> Title media alongside header actions. </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Full combo: card-media + header-media + title-media + actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="16x9">
            <img src=${placeholder16x9} alt="Placeholder" style="width:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title-media>
              <img
                src=${rebusClassic}
                alt="IBM Classic Rebus logo"
                style="width:48px;height:48px;display:block" />
            </cds-card-title-media>
            <cds-card-title
              label="Label"
              description="Full combination: card media, header media, title media and actions">
              Card with title icon
            </cds-card-title>
            <cds-card-actions>
              <cds-card-action label="Edit">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete</span>
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            CardTitleMedia provides a media slot positioned to the left of the
            card title.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithTitleTrailingIcon = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Productive density — 16px icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              >Analytics
              dashboard${iconLoader(Bee16, {
                slot: 'title-end',
              })}</cds-card-title
            >
          </cds-card-header>
          <cds-card-body>
            The trailing icon adapts to the title size. In productive density,
            use 16px icons.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Expressive density — 24px icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card density="expressive">
          <cds-card-header>
            <cds-card-title
              >Analytics
              dashboard${iconLoader(Bee24, {
                slot: 'title-end',
              })}</cds-card-title
            >
          </cds-card-header>
          <cds-card-body>
            The trailing icon adapts to the title size. In expressive density,
            use 24px icons.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Truncated multi-line title with trailing icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title title-truncate="2"
              >Example of long title text that wraps into three lines with
              icon${iconLoader(Bee16, { slot: 'title-end' })}</cds-card-title
            >
          </cds-card-header>
          <cds-card-body>
            When the title wraps to multiple lines, the icon stays inline with
            the text on the last line with 8px gap.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithTruncatedTitle = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Single-line ellipsis truncation -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              title-truncate
              description="Single-line truncation example">
              This is a very long title that will be truncated with an ellipsis
              when it exceeds the maximum width
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            The title is truncated to a single line with an ellipsis.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-icon-button label="Share" kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button label="Download" kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- Multi-line (3 lines) truncation -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              title-truncate="3"
              description="Multi-line truncation example">
              This is a very long title that will be truncated after three
              lines. It demonstrates the multi-line truncation feature using
              WebKit line clamp. Any content beyond three lines will be hidden
              with an ellipsis.
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            The title is truncated to three lines with an ellipsis.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-icon-button label="View" kind="ghost" size="md">
                ${iconLoader(View16, { slot: 'icon' })}
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithVideo = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Native video element above header -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title description="Watch our latest feature walkthrough">
              Product demo video
            </cds-card-title>
          </cds-card-header>
          <cds-card-media ratio="16x9">
            <video
              controls
              style="width:100%;height:100%;object-fit:cover;position:absolute">
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4" />
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </cds-card-media>
          <cds-card-body>
            Video content fills the aspect-ratio container and maintains the
            16:9 ratio.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- YouTube embed via iframe -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="16x9">
            <iframe
              width="100%"
              height="100%"
              style="position:absolute"
              src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>
          </cds-card-media>
          <cds-card-header>
            <cds-card-title description="Getting started guide">
              Tutorial series
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Videos can include a poster image that displays before playback
            starts.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Second YouTube embed -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="16x9">
            <iframe
              width="100%"
              height="100%"
              style="position:absolute"
              src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>
          </cds-card-media>
          <cds-card-header>
            <cds-card-title description="Introduction to Carbon components">
              Carbon Design System
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Embed any iframe-compatible video player using the media slot.
          </cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};
