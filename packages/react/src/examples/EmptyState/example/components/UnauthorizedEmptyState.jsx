/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Add } from '@carbon/icons-react';
import EmptyState from './EmptyState';
import unauthorizedLight from '../assets/unauthorized-light.svg';
import unauthorizedDark from '../assets/unauthorized-dark.svg';

/**
 * Pre-wired EmptyState for unauthorized/access-denied scenarios.
 *
 * Accepts all `EmptyState` props plus boolean variant flags:
 * - `WithDarkModeIllustration` — use the dark illustration
 * - `WithAction`               — text action button
 * - `WithActionIconButton`     — icon action button
 * - `WithSecondaryAction`      — primary + secondary action buttons
 * - `WithLink`                 — documentation link
 * - `WithActionAndLink`        — icon button + documentation link
 */
export const UnauthorizedEmptyState = React.forwardRef(
  function UnauthorizedEmptyState(
    {
      illustrationTheme = 'light',
      subtitle = 'Description text explaining why this section is empty.',
      title = 'Empty state title',
      onActionClick = () => {},
      linkHref = 'https://www.carbondesignsystem.com',
      actionKind,
      actionRenderIcon,
      secondaryActionKind,
      secondaryActionRenderIcon,
      // boolean variant flags
      WithAction = false,
      WithActionIconButton = false,
      WithSecondaryAction = false,
      WithLink = false,
      WithActionAndLink = false,
      ...rest
    },
    ref
  ) {
    const resolvedActionType =
      WithActionAndLink || WithActionIconButton
        ? 'icon'
        : WithSecondaryAction || WithAction
          ? 'text'
          : 'none';

    const action =
      resolvedActionType === 'none'
        ? undefined
        : {
            text: 'Create new',
            onClick: onActionClick,
            ...(actionKind && { kind: actionKind }),
            ...(resolvedActionType === 'icon' && {
              renderIcon: actionRenderIcon ?? ((props) => <Add size={20} {...props} />),
              iconDescription: 'Add icon',
            }),
          };

    const secondaryAction =
      WithSecondaryAction
        ? {
            text: 'Learn more',
            onClick: onActionClick,
            ...(secondaryActionKind && { kind: secondaryActionKind }),
            ...(secondaryActionRenderIcon && { renderIcon: secondaryActionRenderIcon }),
          }
        : undefined;

    const linkText =
      WithActionAndLink || WithLink ? 'View documentation' : undefined;
    const link = linkText
      ? { text: linkText, href: linkHref, target: WithLink ? '_blank' : undefined }
      : undefined;

    return (
      <EmptyState
        {...rest}
        ref={ref}
        illustration={
          illustrationTheme === 'dark' ? unauthorizedDark : unauthorizedLight
        }
        title={title}
        subtitle={subtitle}
        action={action}
        secondaryAction={secondaryAction}
        link={link}
      />
    );
  }
);

UnauthorizedEmptyState.propTypes = {
  /** Illustration theme. Pass `'dark'` when using a dark Carbon theme (g90/g100). */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),
  /** Subtitle / body copy shown below the heading. */
  subtitle: PropTypes.node,
  /** Main heading text. */
  title: PropTypes.node,
  /** Click handler forwarded to action buttons. */
  onActionClick: PropTypes.func,
  /** Base href for the documentation link. */
  linkHref: PropTypes.string,
  /** Carbon button kind for the primary action button. */
  actionKind: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
  /** Custom render icon for the primary action button. */
  actionRenderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Carbon button kind for the secondary action button. */
  secondaryActionKind: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
  /** Custom render icon for the secondary action button. */
  secondaryActionRenderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** Show a text action button. */
  WithAction: PropTypes.bool,
  /** Show an icon action button. */
  WithActionIconButton: PropTypes.bool,
  /** Show primary and secondary action buttons. */
  WithSecondaryAction: PropTypes.bool,
  /** Show a documentation link. */
  WithLink: PropTypes.bool,
  /** Show an icon action button combined with a documentation link. */
  WithActionAndLink: PropTypes.bool,
};
