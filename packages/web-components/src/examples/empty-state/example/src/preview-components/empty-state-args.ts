/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, type TemplateResult } from 'lit';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import Add20 from '@carbon/icons/es/add/20.js';
import Information16 from '@carbon/icons/es/information/16.js';

import '@carbon/web-components/es/components/tooltip/index.js';

export type ActionType = 'none' | 'text' | 'icon';
export type SubtitleType = 'default' | 'withTooltip';

export interface EmptyStateArgs {
  heading?: string;
  headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'md' | 'sm';
  subtitle?: string;
  subtitleType?: SubtitleType;
  illustrationDescription?: string;
  illustrationTheme?: 'light' | 'dark';
  illustrationSrc?: string;
  actionType?: ActionType;
  secondaryAction?: boolean;
  linkText?: string;
  linkHref?: string;
  linkTarget?: string;
  onActionClick?: (event: Event) => void;
}

const subtitleContent = (type?: SubtitleType): TemplateResult | undefined => {
  if (type === 'default') {
    return html`Click <span>Upload assets</span> to upload your data`;
  }
  if (type === 'withTooltip') {
    return html`Click <span>here</span> to upload your data
      <cds-tooltip align="top">
        <button
          class="es-example__tooltip-trigger"
          type="button"
          aria-labelledby="empty-state-tooltip">
          ${iconLoader(Information16)}
        </button>
        <cds-tooltip-content id="empty-state-tooltip">
          Facts and statistics collected together for reference or analysis
        </cds-tooltip-content>
      </cds-tooltip>`;
  }
  return undefined;
};

/**
 * Maps simple Storybook args to `empty-state` properties:
 * - `subtitleType`: `'default'` | `'withTooltip'` (base empty state stories)
 * - `actionType`: `'none'` | `'text'` | `'icon'`
 * - `secondaryAction`: boolean
 * - `linkText`, `linkHref`, `linkTarget`
 */
export const getEmptyStateProps = (args: EmptyStateArgs) => ({
  subtitleContent: subtitleContent(args.subtitleType),
  actionText:
    args.actionType && args.actionType !== 'none' ? 'Create new' : '',
  actionIcon:
    args.actionType === 'icon'
      ? html`${iconLoader(Add20, { slot: 'icon' })}`
      : null,
  secondaryActionText: args.secondaryAction ? 'Learn more' : '',
  linkText: args.linkText ?? '',
  linkHref: args.linkText
    ? (args.linkHref ?? 'https://www.carbondesignsystem.com')
    : '',
  linkTarget: args.linkTarget ?? '',
});
