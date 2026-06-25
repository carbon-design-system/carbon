//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { ReactNode } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pkg } from '../../settings';
import { Button, Heading, usePrefix } from '@carbon/react';
const componentName = 'CardHeader';

const defaults = {
  hasActions: false,
  titleSize: 'default',
};

interface CardHeaderProps {
  actions?: ReactNode;
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode | boolean;
  description?: ReactNode;
  hasActions?: boolean;
  /**
   * is the host card clickable
   */
  inClickableCard?: boolean;
  label?: ReactNode;
  noActionIcons?: boolean;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  primaryButtonDisabled?: boolean;
  primaryButtonIcon?: React.ElementType;
  primaryButtonPlacement?: 'top' | 'bottom';
  primaryButtonText?: string;
  secondaryButtonDisabled?: boolean;
  secondaryButtonHref?: string;
  secondaryButtonIcon?: React.ElementType;
  secondaryButtonKind?: 'secondary' | 'ghost';
  secondaryButtonPlacement?: 'top' | 'bottom';
  secondaryButtonText?: string;
  /**
   * **Experimental:** For all cases a `Slug` component can be provided.
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   * @deprecated please use the `decorator` prop
   */
  slug?: ReactNode;

  title?: ReactNode;
  titleSize?: 'default' | 'large';
}

export const CardHeader = ({
  actions,
  decorator,
  noActionIcons,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonIcon,
  primaryButtonPlacement,
  primaryButtonText,
  primaryButtonDisabled,
  description,
  hasActions = defaults.hasActions,
  inClickableCard,
  label,
  secondaryButtonDisabled,
  secondaryButtonHref,
  secondaryButtonIcon,
  secondaryButtonPlacement,
  secondaryButtonText,
  slug,
  title,
  titleSize = 'default',
}: CardHeaderProps) => {
  const carbonPrefix = usePrefix();
  const blockClass = `${pkg.prefix}--card`;
  const headerClass = `${blockClass}__header`;
  const headerClasses = cx(headerClass, {
    [`${headerClass}-label-only`]: label && !title && !description,
    [`${headerClass}-has-label`]: !!label,
    [`${blockClass}__title-lg`]: titleSize === 'large',
  });
  const actionGhostButton = `${blockClass}__actions-header-ghost-button`;
  const actionGhostButtonClass = cx(actionGhostButton, {
    [`${actionGhostButton}--only`]: noActionIcons,
  });

  const hollowAiIcon = (
    <svg
      className={`${carbonPrefix}--slug ${carbonPrefix}--slug-icon`} // NOTE: We cannot change this to ai-label until carbon changes their classnames on their end
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="23" height="23" />
      <path
        d="M13.2436 16H11.5996L10.9276 13.864H7.95164L7.29164 16H5.68364L8.49164 7.624H10.4596L13.2436 16ZM10.5436 12.508L9.46364 9.064H9.40364L8.33564 12.508H10.5436ZM17.9341 16H14.1301V14.728H15.2341V8.896H14.1301V7.624H17.9341V8.896H16.8181V14.728H17.9341V16Z"
        fill="#161616"
      />
    </svg>
  );

  let normalizedDecorator: React.ReactElement<any> | null = null;
  if (decorator || slug) {
    if (
      inClickableCard ||
      typeof decorator === 'boolean' ||
      typeof slug === 'boolean'
    ) {
      normalizedDecorator = hollowAiIcon;
    } else {
      const element = decorator || slug;
      normalizedDecorator = React.cloneElement(
        element as React.ReactElement<any>,
        {
          size:
            (label && title) || (title && titleSize === 'large') ? 'sm' : 'xs',
        }
      );
    }
  }

  return (
    <div className={headerClasses}>
      <div
        className={cx([
          `${headerClass}-container`,
          { [`${headerClass}-container--has-slug`]: !!slug },
          { [`${headerClass}-container--has-decorator`]: !!decorator },
          { [`${headerClass}-container--has-actions`]: !!hasActions },
          {
            [`${headerClass}-container--large-tile-or-label`]:
              title && (label || titleSize === 'large'),
          },
        ])}
      >
        <div className={`${blockClass}__title-container`}>
          {label && <p className={`${blockClass}__label`}>{label}</p>}
          {title && (
            <Heading className={`${blockClass}__title`}>{title}</Heading>
          )}
          {description && (
            <p className={`${blockClass}__description`}>{description}</p>
          )}
        </div>
        {hasActions && (
          <div
            className={`${blockClass}__actions ${blockClass}__actions-header`}
          >
            {actions}
            {secondaryButtonText && secondaryButtonPlacement === 'top' && (
              <Button
                kind="ghost"
                onClick={onSecondaryButtonClick}
                size="sm"
                renderIcon={secondaryButtonIcon}
                href={secondaryButtonHref}
                className={actionGhostButtonClass}
                disabled={secondaryButtonDisabled}
              >
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && primaryButtonPlacement === 'top' && (
              <Button
                kind="ghost"
                size="sm"
                renderIcon={primaryButtonIcon}
                onClick={onPrimaryButtonClick}
                className={actionGhostButtonClass}
                disabled={primaryButtonDisabled}
              >
                {primaryButtonText}
              </Button>
            )}
          </div>
        )}
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${blockClass}__header__inner-wrapper--decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
/**@ts-ignore */
CardHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  hasActions: PropTypes.bool,
  /**
   * is the host card clickable
   */
  inClickableCard: PropTypes.bool,
  label: PropTypes.string,
  noActionIcons: PropTypes.bool,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  primaryButtonDisabled: PropTypes.bool,
  primaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  primaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  primaryButtonText: PropTypes.string,
  secondaryButtonDisabled: PropTypes.bool,
  secondaryButtonHref: PropTypes.string,
  secondaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  secondaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  secondaryButtonText: PropTypes.string,
  /**
   * **Experimental:** For all cases a `Slug` component can be provided.
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   * @deprecated please use the `decorator` prop
   */
  slug: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  titleSize: PropTypes.oneOf(['default', 'large']),
};
/**@ts-ignore */
CardHeader.displayName = componentName;
