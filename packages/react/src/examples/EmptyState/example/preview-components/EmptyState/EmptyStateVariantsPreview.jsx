/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../../components/EmptyState';
import { getEmptyStateProps } from './getEmptyStateProps';
import '../../styles/_empty-state.scss';

/**
 * Preview component for the Default story. Accepts the base `EmptyState` args
 * plus seven boolean variant flags. Each flag independently activates its own
 * props — multiple flags can be `true` at the same time:
 *
 * | Flag                    | What it activates                           |
 * |-------------------------|---------------------------------------------|
 * | `WithTooltipInSubtitle` | Subtitle with an inline tooltip             |
 * | `WithCustomIllustration`| Custom SVG illustration                     |
 * | `WithAction`            | Text action button                          |
 * | `WithActionIconButton`  | Icon action button                          |
 * | `WithSecondaryAction`   | Primary + secondary action buttons          |
 * | `WithLink`              | Documentation link                          |
 * | `WithActionAndLink`     | Icon action button + documentation link     |
 *
 * All flags default to `false`.
 */
export const EmptyStateVariantsPreview = (props) => (
  <EmptyState {...getEmptyStateProps(props)} />
);

EmptyStateVariantsPreview.propTypes = {
  // ── Base props (passed through to getEmptyStateProps) ──────────────────────
  /** Heading text */
  title: PropTypes.string,
  /** `'default'` | `'withTooltip'` — resolved to a React node by getEmptyStateProps */
  subtitleType: PropTypes.oneOf(['default', 'withTooltip']),
  /** Heading element level */
  headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /** `'md'` | `'sm'` */
  size: PropTypes.oneOf(['md', 'sm']),
  /** `'none'` | `'text'` | `'icon'` */
  actionType: PropTypes.oneOf(['none', 'text', 'icon']),
  /** Click handler forwarded to action and secondary action buttons */
  onActionClick: PropTypes.func,
  // ── Variant boolean flags ──────────────────────────────────────────────────
  /** Show subtitle with an inline tooltip */
  WithTooltipInSubtitle: PropTypes.bool,
  /** Render with a custom SVG illustration */
  WithCustomIllustration: PropTypes.bool,
  /** Show a text action button */
  WithAction: PropTypes.bool,
  /** Show an icon action button */
  WithActionIconButton: PropTypes.bool,
  /** Show primary + secondary action buttons */
  WithSecondaryAction: PropTypes.bool,
  /** Show a documentation link */
  WithLink: PropTypes.bool,
  /** Show an icon action button combined with a documentation link */
  WithActionAndLink: PropTypes.bool,
};

EmptyStateVariantsPreview.defaultProps = {
  subtitleType: 'default',
  actionType: 'none',
  WithTooltipInSubtitle: false,
  WithCustomIllustration: false,
  WithAction: false,
  WithActionIconButton: false,
  WithSecondaryAction: false,
  WithLink: false,
  WithActionAndLink: false,
};
