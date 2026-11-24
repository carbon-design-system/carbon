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
import Analytics32 from '@carbon/icons/es/analytics/32.js';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16.js';
import Bee16 from '@carbon/icons/es/bee/16.js';
import Bee24 from '@carbon/icons/es/bee/24.js';
import Copy16 from '@carbon/icons/es/copy/16.js';
import DirectionFork32 from '@carbon/icons/es/direction--fork/32.js';
import Download16 from '@carbon/icons/es/download/16.js';
import Edit16 from '@carbon/icons/es/edit/16.js';
import Favorite16 from '@carbon/icons/es/favorite/16.js';
import Favorite32 from '@carbon/icons/es/favorite/32.js';
import Launch16 from '@carbon/icons/es/launch/16.js';
import Notification16 from '@carbon/icons/es/notification/16.js';
import Settings16 from '@carbon/icons/es/settings/16.js';
import Share16 from '@carbon/icons/es/share/16.js';
import Time16 from '@carbon/icons/es/time/16.js';
import TrashCan16 from '@carbon/icons/es/trash-can/16.js';
import View16 from '@carbon/icons/es/view/16.js';
import './index';
import '../ai-label';
import '../button';
import '../grid/index';
import '../icon-button';
import '../tag';
import '../icon-indicator';
import '../user-avatar';
import storyDocs from './card.mdx';
import styles from './card-story.scss?lit';
import illustration1 from './_story-assets/illustration-img-1.png';
import illustration16x9 from './_story-assets/illustration-16x9.png';
import illustration1x1 from './_story-assets/illustration-1x1.png';
import illustration2_16x9 from './_story-assets/illustration-2-16x9.png';
import illustration2_1x1 from './_story-assets/illustration-2-1x1.png';
import rebusClassic from './_story-assets/classic-rebus.png';

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
    actionCount: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description:
        'Number of icon-button actions in the card header (0 = no actions). Demonstrates overflow when actions exceed available space.',
    },
    footerActions: {
      control: { type: 'select' },
      options: ['none', 'ghost-button', 'ghost-button-icons', 'icons-only'],
      description:
        'Footer action combination. "ghost-button" — single text action. "ghost-button-icons" — text action with icon secondaries. "icons-only" — icon buttons only. Has no effect when `clickable` is true.',
    },
    mediaRatio: {
      control: { type: 'select' },
      options: [
        'none',
        '16x9',
        '9x16',
        '2x1',
        '1x2',
        '4x3',
        '3x4',
        '3x2',
        '2x3',
        '1x1',
      ],
      description:
        'Aspect ratio of the card media slot. "none" hides the media slot.',
    },
    mediaContent: {
      control: { type: 'select' },
      options: ['image', 'video'],
      description:
        'Content rendered inside the media slot. "video" embeds a YouTube iframe. Has no effect when mediaRatio is "none".',
    },
    showAILabel: {
      control: { type: 'boolean' },
      description: 'Attach an AI label decorator to the card.',
    },
    headerMedia: {
      control: { type: 'select' },
      options: ['none', 'icon', 'tag', 'user-avatar', 'status-indicator'],
      description:
        'Content shown in the header-media slot above the title row.',
    },
    titleMedia: {
      control: { type: 'select' },
      options: ['none', 'image'],
      description: 'Content shown to the left of the title (title-media slot).',
    },
    titleLeadingIcon: {
      control: { type: 'boolean' },
      description: 'Show a leading icon inside the title text row.',
    },
    titleTrailingIcon: {
      control: { type: 'boolean' },
      description: 'Show a trailing icon inside the title text row.',
    },
    renderFooterIcon: {
      control: { type: 'select' },
      options: ['ArrowRight', 'Launch', 'Share', 'Download'],
      description:
        'Icon placed in the footer-icon slot of a clickable card. Only applies when `clickable` is true.',
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
    bodyText: 'Last updated 2 hours ago.',
    actionCount: 0,
    footerActions: 'none',
    mediaRatio: '16x9',
    mediaContent: 'image',
    showAILabel: false,
    headerMedia: 'none',
    titleMedia: 'none',
    titleLeadingIcon: false,
    titleTrailingIcon: false,
    renderFooterIcon: 'ArrowRight',
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
  actionCount: { control: false },
  footerActions: { control: false },
  mediaRatio: { control: false },
  mediaContent: { control: false },
  showAILabel: { control: false },
  headerMedia: { control: false },
  titleMedia: { control: false },
  titleLeadingIcon: { control: false },
  titleTrailingIcon: { control: false },
  renderFooterIcon: { control: false },
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

// Icons for the clickable card footer, keyed by the renderFooterIcon control.
// "ArrowRight" is the built-in default, so the slot is left empty for it.
const FOOTER_ICON_MAP = {
  Launch: Launch16,
  Share: Share16,
  Download: Download16,
};

// Renders a header action for each of the first `count` icons.
const renderHeaderActions = (count: number, cardTitle: string) =>
  count > 0
    ? html`
        <cds-card-actions
          slot="actions"
          overflow-menu-label=${`More actions for ${cardTitle}`}>
          ${_defaultActionIcons.slice(0, count).map(
            ({ icon, label: actionLabel }) => html`
              <cds-card-action label=${`${actionLabel} ${cardTitle}`}>
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(icon, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >${`${actionLabel} ${cardTitle}`}</span
                  >
                </cds-icon-button>
              </cds-card-action>
            `
          )}
        </cds-card-actions>
      `
    : '';

// Maps the headerMedia control value to markup for the header-media slot.
const renderHeaderMedia = (headerMedia: string) => {
  switch (headerMedia) {
    case 'icon':
      return html`<div slot="header-media">${iconLoader(Analytics32)}</div>`;
    case 'tag':
      return html`<div slot="header-media">
        <cds-tag type="blue">New</cds-tag>
      </div>`;
    case 'user-avatar':
      return html`<div slot="header-media">
        <cds-user-avatar name="Thomas J. Watson" size="md"></cds-user-avatar>
      </div>`;
    case 'status-indicator':
      return html`<div slot="header-media">
        <cds-icon-indicator
          kind="succeeded"
          size="16"
          label="Succeeded"></cds-icon-indicator>
      </div>`;
    default:
      return '';
  }
};

// Maps the titleMedia control value to markup for the title-media slot.
const renderTitleMedia = (titleMedia: string) =>
  titleMedia === 'image'
    ? html`<div slot="title-media">
        <img
          src=${rebusClassic}
          alt="IBM Classic Rebus logo"
          style="width:48px;height:48px;display:block" />
      </div>`
    : '';

// Renders the footer action combination selected via the footerActions control.
// Not used when the card is clickable (clickable cards render their own footer).
const renderFooterActions = (footerActions: string, cardTitle: string) => {
  if (footerActions === 'none') {
    return '';
  }
  const hasButton =
    footerActions === 'ghost-button' || footerActions === 'ghost-button-icons';
  const hasIcons =
    footerActions === 'ghost-button-icons' || footerActions === 'icons-only';
  return html`
    <cds-card-footer>
      ${hasButton
        ? html`
            <cds-card-action>
              <cds-button
                kind="ghost"
                size="md"
                aria-label=${`View details for ${cardTitle}`}>
                View details
              </cds-button>
            </cds-card-action>
          `
        : ''}
      ${hasIcons
        ? html`
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
                <span slot="tooltip-content">Share ${cardTitle}</span>
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
                <span slot="tooltip-content">Download ${cardTitle}</span>
              </cds-icon-button>
            </cds-card-action>
          `
        : ''}
    </cds-card-footer>
  `;
};

const renderMedia = (mediaRatio: string, mediaContent: string) =>
  mediaRatio === 'none'
    ? ''
    : html`
        <cds-card-media ratio=${mediaRatio}>
          ${mediaContent === 'video'
            ? html`
                <iframe
                  width="100%"
                  height="100%"
                  style="position:absolute"
                  src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&amp;controls=0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin">
                </iframe>
              `
            : html`<img src=${illustration1x1} alt="" style="width:100%" />`}
        </cds-card-media>
      `;

const renderAILabel = (title: string) => html`
  <cds-ai-label
    alignment="bottom-left"
    slot="decorator"
    button-label="Show information for ${title}">
    <div slot="body-text">
      <h3 class="card-story__ai-heading secondary">AI Explained</h3>
      <p class="ai-label-heading">84%</p>
      <h4 class="card-story__ai-heading secondary bold">Confidence score</h4>
      <p class="secondary">This content was generated using IBM AI services.</p>
      <hr />
      <p class="secondary">Model type</p>
      <p class="bold">Foundation model</p>
    </div>
  </cds-ai-label>
`;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default = {
  args: {
    actionCount: 4,
  },
  render: ({
    label,
    title,
    description,
    bodyText,
    actionCount,
    footerActions,
    mediaRatio,
    mediaContent,
    showAILabel,
    headerMedia,
    titleMedia,
    titleLeadingIcon,
    titleTrailingIcon,
    renderFooterIcon,
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
          ${renderMedia(mediaRatio, mediaContent)}
          <cds-card-header>
            ${renderHeaderMedia(headerMedia)}
            <cds-card-title
              label=${ifDefined(label || undefined)}
              description=${ifDefined(description || undefined)}>
              ${renderTitleMedia(titleMedia)}
              ${titleLeadingIcon
                ? iconLoader(Bee16, { slot: 'title-start' })
                : ''}
              ${title}
              ${titleTrailingIcon
                ? iconLoader(Bee16, { slot: 'title-end' })
                : ''}
            </cds-card-title>
            ${renderHeaderActions(actionCount, title)}
            ${showAILabel ? renderAILabel(title) : ''}
          </cds-card-header>
          <cds-card-body>${bodyText}</cds-card-body>
          ${cardArgs.clickable ? '' : renderFooterActions(footerActions, title)}
          ${cardArgs.clickable && FOOTER_ICON_MAP[renderFooterIcon]
            ? iconLoader(FOOTER_ICON_MAP[renderFooterIcon], {
                slot: 'footer-icon',
                'aria-hidden': 'true',
              })
            : ''}
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
            <img src=${illustration16x9} alt="" style="width:100%" />
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
            <img src=${illustration2_16x9} alt="" style="width:100%" />
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
            <img src=${illustration16x9} alt="" style="width:100%" />
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
  args: {
    disabled: true,
  },
  argTypes: (({
    density: _density,
    disabled: _disabled,
    label: _label,
    title: _title,
    description: _description,
    bodyText: _bodyText,
    ...rest
  }) => rest)(readonlyArgTypes),
  render: ({ density, disabled, label, title, description, bodyText }) => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card
          density=${ifDefined(density || undefined)}
          ?disabled=${disabled}
          aria-label=${ifDefined(disabled ? title : undefined)}>
          <cds-card-header>
            <cds-card-title
              label=${ifDefined(label || undefined)}
              description=${ifDefined(description || undefined)}>
              ${title}
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>${bodyText}</cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button
                kind="ghost"
                size="md"
                aria-label=${`Action for ${title}`}
                ?disabled=${disabled}>
                Action
              </cds-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md" ?disabled=${disabled}>
                ${iconLoader(Download16, { slot: 'icon' })}
                <span slot="tooltip-content">Download ${title}</span>
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const Minimal = {
  args: {
    bodyText: 'Card body content.',
  },
  argTypes: {
    ...readonlyArgTypes,
    bodyText: { control: 'text' },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: ({ density, clickable, disabled, horizontal, bodyText }) => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card
          density=${ifDefined(density || undefined)}
          ?clickable=${clickable}
          ?disabled=${disabled}
          ?horizontal=${horizontal}
          aria-label=${ifDefined(clickable ? 'Minimal card' : undefined)}>
          <cds-card-body>${bodyText}</cds-card-body>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

export const WithDensities = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title label="Category" description="Card description">
              Card title
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>5,240 active users across 12 regions.</cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button
                kind="ghost"
                size="md"
                aria-label="View details for Card title"
                >View details</cds-button
              >
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
      <cds-column lg="4" md="4" sm="4">
        <cds-card density="expressive">
          <cds-card-header>
            <cds-card-title label="Category" description="Card description">
              Card title
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>5,240 active users across 12 regions.</cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button
                kind="ghost"
                size="md"
                aria-label="View details for Card title"
                >View details</cds-button
              >
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};

const aiLabelActions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content">View</span>
  </cds-icon-button>
`;

export const WithAILabel = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Basic card with AI label -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title label="AI-powered" description="Generated by AI">
              Usage Analytics
            </cds-card-title>
            <cds-ai-label
              alignment="bottom-left"
              slot="decorator"
              button-label="Show information for Usage Analytics">
              <div slot="body-text">
                <h3 class="card-story__ai-heading secondary">AI Explained</h3>
                <p class="ai-label-heading">84%</p>
                <h4 class="card-story__ai-heading secondary bold">
                  Confidence score
                </h4>
                <p class="secondary">
                  This content was generated using IBM AI services with high
                  confidence based on historical data patterns.
                </p>
                <hr />
                <p class="secondary">Model type</p>
                <p class="bold">Foundation model</p>
              </div>
              ${aiLabelActions}
            </cds-ai-label>
          </cds-card-header>
          <cds-card-body>
            This card demonstrates the AI label feature with a blue gradient
            border indicating AI-generated content.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Card with AI label and header media (icon) -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <div slot="header-media">${iconLoader(Analytics16)}</div>
            <cds-card-title description="AI-generated summary">
              Performance Insights
            </cds-card-title>
            <cds-ai-label
              alignment="bottom-left"
              slot="decorator"
              button-label="Show information for Performance Insights">
              <div slot="body-text">
                <h3 class="card-story__ai-heading secondary">AI Explained</h3>
                <p class="ai-label-heading">92%</p>
                <h4 class="card-story__ai-heading secondary bold">
                  Confidence score
                </h4>
                <p class="secondary">
                  Performance insights generated by AI analysis of system
                  metrics and user behavior patterns.
                </p>
                <hr />
                <p class="secondary">Model type</p>
                <p class="bold">Analytics model</p>
              </div>
              ${aiLabelActions}</cds-ai-label
            >
          </cds-card-header>
          <cds-card-body
            >Card with AI label and header media slot (icon).</cds-card-body
          >
        </cds-card>
      </cds-column>

      <!-- Card with AI label and header actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title>Smart Recommendations Long title</cds-card-title>
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Smart Recommendations Long title">
              <cds-card-action label="Edit Smart Recommendations Long title">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Edit Smart Recommendations Long title</span
                  >
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete Smart Recommendations Long title">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Delete Smart Recommendations Long title</span
                  >
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
            <cds-ai-label
              alignment="bottom-left"
              slot="decorator"
              button-label="Show information for Smart Recommendations">
              <div slot="body-text">
                <h3 class="card-story__ai-heading secondary">AI Explained</h3>
                <p class="ai-label-heading">88%</p>
                <h4 class="card-story__ai-heading secondary bold">
                  Confidence score
                </h4>
                <p class="secondary">
                  Smart recommendations powered by AI learning from user
                  preferences and behavior.
                </p>
                <hr />
                <p class="secondary">Model type</p>
                <p class="bold">Recommendation engine</p>
              </div>
              ${aiLabelActions}
            </cds-ai-label>
          </cds-card-header>
          <cds-card-body>
            Card with AI label and actions. Note how the actions are positioned
            to the left of the AI label with proper spacing.
          </cds-card-body>
          <cds-card-footer>
            <cds-button
              kind="tertiary"
              size="sm"
              aria-label="View Details for Smart Recommendations Long title"
              >View Details</cds-button
            >
          </cds-card-footer>
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
            <div class="card-story-flush-demo-content">
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
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Website Redesign">
              <cds-card-action label="Edit Website Redesign">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit Website Redesign</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete Website Redesign">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete Website Redesign</span>
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
              <cds-button
                kind="ghost"
                size="md"
                aria-label="View report for Website Redesign"
                >View report</cds-button
              >
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
                <span slot="tooltip-content">Share Website Redesign</span>
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
                <span slot="tooltip-content">Download Website Redesign</span>
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
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Project dashboard">
              <cds-card-action label="Edit Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Favorite Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Favorite16, { slot: 'icon' })}
                  <span slot="tooltip-content">Favorite Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Analytics Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Analytics16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Analytics Project dashboard</span
                  >
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Share Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Share16, { slot: 'icon' })}
                  <span slot="tooltip-content">Share Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Download Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Download16, { slot: 'icon' })}
                  <span slot="tooltip-content">Download Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Settings Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Settings16, { slot: 'icon' })}
                  <span slot="tooltip-content">Settings Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Notification Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Notification16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Notification Project dashboard</span
                  >
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="View Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(View16, { slot: 'icon' })}
                  <span slot="tooltip-content">View Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Copy Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Copy16, { slot: 'icon' })}
                  <span slot="tooltip-content">Copy Project dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete Project dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete Project dashboard</span>
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
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Usage metrics">
              <cds-card-action>
                <cds-button
                  kind="tertiary"
                  size="sm"
                  aria-label="Action for Usage metrics"
                  >Action</cds-button
                >
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
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Usage metrics">
              <cds-card-action>
                <cds-button
                  kind="tertiary"
                  size="sm"
                  aria-label="Export for Usage metrics"
                  >Export</cds-button
                >
              </cds-card-action>
              <cds-card-action>
                <cds-button
                  kind="tertiary"
                  size="sm"
                  aria-label="Share for Usage metrics"
                  >Share</cds-button
                >
              </cds-card-action>
              <cds-card-action>
                <cds-button
                  kind="tertiary"
                  size="sm"
                  aria-label="View report for Usage metrics"
                  >View report</cds-button
                >
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
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for This is a very long card title that wraps across multiple lines in a narrow container">
              <cds-card-action
                label="Edit This is a very long card title that wraps across multiple lines in a narrow container">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Edit This is a very long card title that wraps across
                    multiple lines in a narrow container</span
                  >
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action
                label="Favorite This is a very long card title that wraps across multiple lines in a narrow container">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Favorite16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Favorite This is a very long card title that wraps across
                    multiple lines in a narrow container</span
                  >
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action
                label="Share This is a very long card title that wraps across multiple lines in a narrow container">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Share16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Share This is a very long card title that wraps across
                    multiple lines in a narrow container</span
                  >
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
            <div slot="header-media">
              ${iconLoader(Analytics16, { style: 'display:block' })}
            </div>
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Analytics Dashboard">
              <cds-card-action label="Edit Analytics Dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit Analytics Dashboard</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete Analytics Dashboard">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content">Delete Analytics Dashboard</span>
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
            <div slot="header-media">
              <img
                src=${illustration1}
                alt=""
                style="width:48px;height:48px;border-radius:4px" />
            </div>
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
            <div slot="header-media">
              <cds-tag type="blue">New</cds-tag>
            </div>
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
            <div slot="header-media">
              <cds-icon-indicator
                kind="succeeded"
                size="16"
                label="Succeeded"></cds-icon-indicator>
            </div>
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

export const WithHorizontalMedia = {
  argTypes: readonlyArgTypes,
  render: () => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <!-- Variant 1: media-left (default start position) with 1x1 image -->
      <cds-column lg="8" md="4" sm="4">
        <cds-card horizontal>
          <cds-card-media media-width="33.33%">
            <img src=${illustration1x1} alt="" style="width:100%;height:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title label="Get started">
              Generate synthetic tabular data
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Prepare your data and generate synthetic tabular data using
            AI-assisted tooling.
          </cds-card-body>
          <cds-card-footer>
            <cds-button kind="tertiary" size="md">
              Start ${iconLoader(ArrowRight16, { slot: 'icon' })}
            </cds-button>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- Variant 2: custom media width (50%) -->
      <cds-column lg="8" md="4" sm="4">
        <cds-card horizontal>
          <cds-card-media media-width="50%">
            <img
              src=${illustration2_16x9}
              alt=""
              style="width:100%;height:100%" />
          </cds-card-media>
          <cds-card-header>
            <cds-card-title>Custom media width</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            Pass media-width="50%" to control the media column width. Accepts
            any valid CSS value.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md">
                Learn more ${iconLoader(ArrowRight16, { slot: 'icon' })}
              </cds-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- Variant 3: media on the right (media-position="end") -->
      <cds-column lg="8" md="4" sm="4">
        <cds-card horizontal media-position="end">
          <cds-card-header>
            <cds-card-title>Content before media</cds-card-title>
          </cds-card-header>
          <cds-card-body>
            When media-position="end" is set, the media column is rendered on
            the right side of the card.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button kind="ghost" size="md">
                Learn more ${iconLoader(ArrowRight16, { slot: 'icon' })}
              </cds-button>
            </cds-card-action>
          </cds-card-footer>
          <cds-card-media>
            <img
              src=${illustration2_1x1}
              alt=""
              style="width:100%;height:100%" />
          </cds-card-media>
        </cds-card>
      </cds-column>

      <!-- Variant 4: expressive density, no body, header-media icon + time footer -->
      <cds-column lg="8" md="4" sm="4">
        <cds-card horizontal density="expressive" media-position="end">
          <cds-card-header>
            <div slot="header-media">
              ${iconLoader(DirectionFork32, { style: 'display:block' })}
            </div>
            <cds-card-title label="Prepare your data">
              Generate synthetic tabular data
            </cds-card-title>
          </cds-card-header>
          <cds-card-footer>
            <div class="card-story-time">
              ${iconLoader(Time16, {})} 12:00 PM
            </div>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(ArrowRight16, { slot: 'icon' })}
                <span slot="tooltip-content"
                  >Next Generate synthetic tabular data</span
                >
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
          <cds-card-media>
            <img src=${illustration1x1} alt="" style="width:100%;height:100%" />
          </cds-card-media>
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
            <div slot="header-media">
              ${iconLoader(Analytics16, { style: 'display:block' })}
            </div>
            <cds-card-title description="Real-time metrics">
              Analytics Dashboard
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card includes a small icon (16px) alongside the title.
          </cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-button
                kind="ghost"
                size="md"
                aria-label="View report for Analytics Dashboard"
                >View report</cds-button
              >
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
                <span slot="tooltip-content">Share Analytics Dashboard</span>
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(View16, { slot: 'icon' })}
                <span slot="tooltip-content">View Analytics Dashboard</span>
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
                <span slot="tooltip-content">Download Analytics Dashboard</span>
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- Larger 32px header media icon -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <div slot="header-media">
              ${iconLoader(Favorite32, { style: 'display:block' })}
            </div>
            <cds-card-title description="Your saved content">
              Favorite Items
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            This card includes a larger icon (32px) for more prominence.
          </cds-card-body>
          <cds-card-footer>
            <cds-button
              kind="tertiary"
              size="md"
              aria-label="Learn more for Favorite Items"
              >Learn more</cds-button
            >
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
            <img src=${illustration16x9} alt="" style="width:100%" />
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
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
                <span slot="tooltip-content">Share Product Launch Event</span>
              </cds-icon-button>
            </cds-card-action>
          </cds-card-footer>
        </cds-card>
      </cds-column>

      <!-- 1x1 square media + footer buttons -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="1x1">
            <img src=${illustration2_1x1} alt="" style="width:100%" />
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
              <cds-button
                kind="ghost"
                size="md"
                aria-label="Cancel for Square Format"
                >Cancel</cds-button
              >
            </cds-card-action>
            <cds-card-action>
              <cds-button kind="primary" size="md">
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
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              <div slot="title-media">
                <img
                  src=${rebusClassic}
                  alt="IBM Classic Rebus logo"
                  style="width:48px;height:48px;display:block" />
              </div>
              Card with title icon
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            The title-media slot places media to the left of the card title.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- 64px image -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              <div slot="title-media">
                <img
                  src=${rebusClassic}
                  alt="IBM Classic Rebus logo"
                  style="width:64px;height:64px;display:block" />
              </div>
              Card with title icon
            </cds-card-title>
          </cds-card-header>
          <cds-card-body>
            The media adapts to the heading area height (min 48px, max 64px).
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- 48px title image + header actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              <div slot="title-media">
                <img
                  src=${rebusClassic}
                  alt="IBM Classic Rebus logo"
                  style="width:48px;height:48px;display:block" />
              </div>
              Card with title icon
            </cds-card-title>
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Card with title icon">
              <cds-card-action label="Edit Card with title icon">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit Card with title icon</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete Card with title icon">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Delete Card with title icon</span
                  >
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            Header media and title media alongside header actions.
          </cds-card-body>
        </cds-card>
      </cds-column>

      <!-- Header media (status) + 48px title image + header actions -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <div slot="header-media">
              <cds-icon-indicator
                kind="succeeded"
                size="16"
                label="Succeeded"></cds-icon-indicator>
            </div>
            <cds-card-title
              label="Label"
              description="The title media slot positions an icon to the left of the title text">
              <div slot="title-media">
                <img
                  src=${rebusClassic}
                  alt="IBM Classic Rebus logo"
                  style="width:48px;height:48px;display:block" />
              </div>
              Card with title icon
            </cds-card-title>
            <cds-card-actions
              slot="actions"
              overflow-menu-label="More actions for Card with title icon">
              <cds-card-action label="Edit Card with title icon">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(Edit16, { slot: 'icon' })}
                  <span slot="tooltip-content">Edit Card with title icon</span>
                </cds-icon-button>
              </cds-card-action>
              <cds-card-action label="Delete Card with title icon">
                <cds-icon-button kind="ghost" size="sm">
                  ${iconLoader(TrashCan16, { slot: 'icon' })}
                  <span slot="tooltip-content"
                    >Delete Card with title icon</span
                  >
                </cds-icon-button>
              </cds-card-action>
            </cds-card-actions>
          </cds-card-header>
          <cds-card-body>
            Build passed all 847 checks. Ready to merge.
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
  args: {
    label: 'Category',
    title:
      'A long card title that will be truncated once it exceeds the available width',
    description: '3 regions',
    bodyText: '14 of 20 steps completed.',
    titleTruncate: 'true',
    labelTruncate: false,
    descriptionTruncate: false,
    actionCount: 0,
  },
  argTypes: {
    ...readonlyArgTypes,
    label: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    bodyText: { control: 'text' },
    actionCount: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description:
        'Number of icon actions to show in the header (0–10). Overflow collapses into a menu.',
    },
    titleTruncate: {
      control: { type: 'select' },
      options: ['false', 'true', '2', '3', '4'],
      description:
        'Truncate the title. `true` clamps to 1 line; a number clamps to that many lines.',
    },
    labelTruncate: {
      control: 'boolean',
      description: 'Truncate the label to a single line with an ellipsis.',
    },
    descriptionTruncate: {
      control: 'boolean',
      description:
        'Truncate the description to a single line with an ellipsis.',
    },
  },
  render: ({
    label,
    title,
    description,
    bodyText,
    titleTruncate,
    labelTruncate,
    descriptionTruncate,
    actionCount,
  }) => html`
    <style>
      ${styles}
    </style>
    <cds-grid with-row-gap>
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-header>
            <cds-card-title
              label=${ifDefined(label || undefined)}
              description=${ifDefined(description || undefined)}
              title-truncate=${ifDefined(
                titleTruncate === 'false' ? undefined : titleTruncate
              )}
              ?label-truncate=${labelTruncate}
              ?description-truncate=${descriptionTruncate}>
              ${title}
            </cds-card-title>
            ${renderHeaderActions(actionCount, title)}
          </cds-card-header>
          <cds-card-body>${bodyText}</cds-card-body>
          <cds-card-footer>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Share16, { slot: 'icon' })}
                <span slot="tooltip-content">Share</span>
              </cds-icon-button>
            </cds-card-action>
            <cds-card-action>
              <cds-icon-button kind="ghost" size="md">
                ${iconLoader(Download16, { slot: 'icon' })}
                <span slot="tooltip-content">Download</span>
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
            <video controls style="width:100%;height:100%;object-fit:cover;">
              <source
                src="https://www.youtube.com/watch?v=Veg7njIKUm4"
                type="video/mp4" />
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </cds-card-media>
          <cds-card-body>
            Video content fills the AspectRatio container and maintains the 16:9
            aspect ratio.
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
              src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&amp;controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin">
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

      <!-- Second YouTube embed (media only) -->
      <cds-column lg="4" md="4" sm="4">
        <cds-card>
          <cds-card-media ratio="16x9">
            <iframe
              width="100%"
              height="100%"
              style="position:absolute"
              src="https://www.youtube.com/embed/Veg7njIKUm4?si=B9yWeUzcFHI4ITD1&amp;controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
          </cds-card-media>
        </cds-card>
      </cds-column>
    </cds-grid>
  `,
};
