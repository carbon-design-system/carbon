//
// Copyright IBM Corp. 2020, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { PropsWithChildren, ReactNode, forwardRef } from 'react';
import cx from 'classnames';
import {
  Button,
  IconButton,
  OverflowMenu,
  MenuItem,
  Layer,
  Section,
  unstable_FeatureFlags as FeatureFlags,
} from '@carbon/react';
import { CheckmarkOutline, Incomplete } from '@carbon/react/icons';
import PropTypes from 'prop-types';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';
import { pkg } from '../../settings';
const componentName = 'Card';

interface Metadata {
  id?: string;
  icon?: () => ReactNode;
  iconDescription?: string;
  [key: `data-${string}`]: string;
}

type LinkType = {
  href: string;
} & {
  [key: string]: unknown;
};

export interface ActionIcon extends Metadata {
  onKeyDown?: (event: KeyboardEvent) => void;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  /**
   * @deprecated please use the `link.href` instead
   */
  href?: string;
  link?: LinkType;
}

type OverflowActions = {
  id?: string;
  itemText?: string;
  onClick?: () => void;
  onKeyDown?: () => void;
};

interface CardProp extends PropsWithChildren {
  actionIcons?: readonly ActionIcon[];
  actionsPlacement?: 'top' | 'bottom';
  children?: ReactNode;
  className?: string;
  clickZone?: 'one' | 'two' | 'three';
  description?: ReactNode;
  disabled?: boolean;
  footerActionIcon?: React.ElementType;
  getStarted?: boolean;
  label?: ReactNode;
  media?: ReactNode;
  mediaPosition?: 'top' | 'left';
  metadata?: readonly Metadata[];
  onClick?: () => void;
  onKeyDown?: () => void;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  overflowActions?: readonly OverflowActions[];
  overflowAriaLabel?: string;
  pictogram?: () => ReactNode;
  primaryButtonDisabled?: boolean;
  primaryButtonHref?: string;
  primaryButtonIcon?: React.ElementType;
  primaryButtonKind?: 'primary' | 'ghost';
  primaryButtonPlacement?: 'top' | 'bottom';
  primaryButtonText?: string;
  productive?: boolean;
  secondaryButtonDisabled?: boolean;
  secondaryButtonHref?: string;
  secondaryButtonIcon?: React.ElementType;
  secondaryButtonKind?: 'secondary' | 'ghost';
  secondaryButtonPlacement?: 'top' | 'bottom';
  secondaryButtonText?: string;
  sequence?: number;
  iconDescription?: string;

  /**
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   * @deprecated please use the `decorator` prop
   */
  slug?: ReactNode | boolean;

  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode | boolean;

  status?: 'complete' | 'incomplete';
  title?: ReactNode;
  titleSize?: 'default' | 'large';
}

export const Card = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      actionIcons = Object.freeze([]),
      actionsPlacement = 'bottom',
      decorator,
      metadata = Object.freeze([]),
      children,
      className,
      clickZone = 'one',
      description,
      disabled,
      footerActionIcon,
      getStarted,
      label,
      media,
      mediaPosition = 'top',
      onClick,
      onKeyDown,
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      overflowActions = Object.freeze([]),
      overflowAriaLabel,
      pictogram: Pictogram,
      primaryButtonDisabled,
      primaryButtonHref,
      primaryButtonIcon,
      primaryButtonKind = 'primary',
      primaryButtonPlacement = 'bottom',
      primaryButtonText,
      productive = false,
      secondaryButtonDisabled,
      secondaryButtonHref,
      secondaryButtonIcon,
      secondaryButtonKind = 'secondary',
      secondaryButtonPlacement = 'bottom',
      secondaryButtonText,
      slug,
      status,
      sequence,
      title,
      titleSize = 'default',
      iconDescription = 'Options',

      // Collect any other property values passed in.
      ...rest
    }: CardProp,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const getIcons = (): readonly ActionIcon[] =>
      getStarted ? metadata : actionIcons;
    const blockClass = `${pkg.prefix}--card`;
    const hasActions =
      getIcons().length > 0 ||
      overflowActions.length > 0 ||
      (!!primaryButtonText && primaryButtonPlacement === 'top');
    const hasHeaderActions = hasActions && actionsPlacement === 'top';
    const hasFooterActions = hasActions && actionsPlacement === 'bottom';
    const hasFooterButton =
      !!secondaryButtonText ||
      (!!primaryButtonText && primaryButtonPlacement === 'bottom');
    const hasBottomBar = hasFooterActions || hasFooterButton;
    const hasClickEvent = !!onClick || !!onKeyDown;
    const clickableProps = {
      onClick,
      onKeyDown,
      role: 'button',
      tabIndex: 0,
    };

    // actions can either be an overflow menu or series of icons
    const getActions = () => {
      if (overflowActions.length > 0) {
        const pos = actionsPlacement === 'top' ? 'bottom-end' : 'top-end';
        const size = actionsPlacement === 'top' ? 'sm' : 'md';
        return (
          <Layer level={2}>
            <FeatureFlags enableV12Overflowmenu>
              <OverflowMenu
                autoAlign
                menuAlignment={pos}
                size={size}
                label={overflowAriaLabel || iconDescription}
              >
                {overflowActions.map(
                  ({ id, itemText, onKeyDown, onClick, ...rest }) => (
                    <MenuItem
                      {...rest}
                      key={id}
                      label={itemText ?? ''}
                      onKeyDown={onKeyDown}
                      onClick={onClick}
                    />
                  )
                )}
              </OverflowMenu>
            </FeatureFlags>
          </Layer>
        );
      }

      const icons = getIcons().map(
        ({
          id,
          icon: Icon,
          onClick,
          iconDescription,
          href: deprecatedHref,
          link,
          ...rest
        }) => {
          const { href, ...linkProps } = link ?? { href: deprecatedHref };

          if (getStarted) {
            return (
              <span key={id} className={`${blockClass}__icon`}>
                {Icon && <Icon aria-label={iconDescription} />}
                {iconDescription}
              </span>
            );
          }
          if (productive) {
            return (
              <Button
                {...rest}
                key={id}
                renderIcon={Icon}
                hasIconOnly
                onClick={onClick}
                size={actionsPlacement === 'top' ? 'sm' : 'md'}
                iconDescription={iconDescription}
                kind="ghost"
                href={href}
                {...linkProps}
              />
            );
          }
          if (href) {
            return (
              <a
                key={id}
                className={`${blockClass}__icon`}
                href={href}
                onClick={onClick}
                {...linkProps}
              >
                {Icon && <Icon aria-label={iconDescription} />}
              </a>
            );
          }
          return (
            <IconButton
              key={id}
              label={iconDescription}
              className={`${blockClass}__icon`}
              onClick={onClick}
              kind="ghost"
              size="sm"
            >
              {Icon && <Icon aria-label={iconDescription} />}
            </IconButton>
          );
        }
      );

      return icons;
    };

    const getCardProps = () => {
      const clickable =
        (hasClickEvent && !productive) ||
        (hasClickEvent && productive && clickZone === 'one');
      const cardProps = {
        ...rest,
        ref,
        className: cx(
          blockClass,
          {
            [`${blockClass}__disabled`]: disabled,
            [`${blockClass}__get-started`]: getStarted,
            [`${blockClass}__productive`]: productive,
            [`${blockClass}__clickable`]: clickable,
            [`${blockClass}__media-left`]: mediaPosition === 'left',
            [`${blockClass}--has-slug`]: !!slug,
            [`${blockClass}--has-decorator`]:
              !!decorator && decorator['type']?.displayName !== 'AILabel',
            [`${blockClass}--has-ai-label`]:
              !!decorator && decorator['type']?.displayName === 'AILabel',
          },
          className
        ),
        ...(clickable && clickableProps),
      };

      return cardProps;
    };

    // the only reason this is necessary is for click zone 2
    const getHeaderBodyProps = () => {
      const clickable = hasClickEvent && clickZone === 'two';
      const headerBodyProps = {
        className: cx(`${blockClass}__header-body-container`, {
          [`${blockClass}__clickable`]: clickable,
        }),
        ...(clickable && clickableProps),
      };

      return headerBodyProps;
    };

    const getHeaderProps = () => ({
      actions: actionsPlacement === 'top' ? getActions() : '',
      decorator,
      noActionIcons:
        getIcons().length > 0 && actionsPlacement === 'top' ? false : true,
      actionsPlacement,
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      primaryButtonIcon,
      primaryButtonPlacement,
      primaryButtonText,
      primaryButtonDisabled,
      description,
      hasActions: hasHeaderActions,
      inClickableCard: hasClickEvent,
      label,
      secondaryButtonDisabled,
      secondaryButtonHref,
      secondaryButtonIcon,
      secondaryButtonPlacement,
      secondaryButtonText,
      slug,
      title,
      titleSize,
    });

    const getBodyProps = () => {
      const clickable = hasClickEvent && clickZone === 'three';
      const bodyProps = {
        className: cx(`${blockClass}__body`, {
          [`${blockClass}__clickable`]: clickable,
        }),
        ...(clickable && clickableProps),
      };

      return bodyProps;
    };

    const getFooterProps = () => ({
      actions: actionsPlacement === 'bottom' ? getActions() : '',
      actionsPlacement,
      disabled,
      footerActionIcon,
      hasActions: hasFooterActions,
      hasButton: hasFooterButton,
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      primaryButtonDisabled,
      primaryButtonHref,
      primaryButtonIcon,
      primaryButtonKind,
      primaryButtonPlacement,
      primaryButtonText,
      productive,
      secondaryButtonDisabled,
      secondaryButtonHref,
      secondaryButtonIcon,
      secondaryButtonKind,
      secondaryButtonPlacement,
      secondaryButtonText,
    });
    return (
      <Section as="div" aria-disabled={disabled} {...getCardProps()}>
        {!getStarted && media && (
          <div className={`${blockClass}__media`}>{media}</div>
        )}
        {Pictogram && (
          <div className={`${blockClass}__pictogram`}>
            <Pictogram />
          </div>
        )}
        {getStarted && sequence && (
          <div className={`${blockClass}__sequence`}>{sequence}</div>
        )}
        {getStarted && status && (
          <div className={`${blockClass}__status`}>
            {status === 'incomplete' && <Incomplete />}
            {status === 'complete' && <CheckmarkOutline />}
          </div>
        )}
        <div className={`${blockClass}__content-container`}>
          <div {...getHeaderBodyProps()}>
            <div className={`${blockClass}__header-wrapper`}>
              <CardHeader {...getHeaderProps()} />
              <div {...getBodyProps()}>{children}</div>
            </div>
            {getStarted && media && (
              <div className={`${blockClass}__media`}>{media}</div>
            )}
          </div>
          {hasBottomBar && <CardFooter {...getFooterProps()} />}
        </div>
      </Section>
    );
  }
);

Card.propTypes = {
  /**@ts-ignore */
  actionIcons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      onKeyDown: PropTypes.func,
      onClick: PropTypes.func,
      iconDescription: PropTypes.string,
      /**
       * @deprecated please use the `link.href` instead
       */
      href: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }),
    })
  ),
  actionsPlacement: PropTypes.oneOf(['top', 'bottom']),
  children: PropTypes.node,
  className: PropTypes.string,
  clickZone: PropTypes.oneOf(['one', 'two', 'three']),
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  /**@ts-ignore */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  /**@ts-ignore */
  footerActionIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  getStarted: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  media: PropTypes.node,
  mediaPosition: PropTypes.oneOf(['top', 'left']),
  /**@ts-ignore */
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      iconDescription: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  /**@ts-ignore */
  overflowActions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      itemText: PropTypes.string,
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
    })
  ),
  overflowAriaLabel: PropTypes.string,
  /**@ts-ignore */
  pictogram: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  primaryButtonDisabled: PropTypes.bool,
  primaryButtonHref: PropTypes.string,
  /**@ts-ignore */
  primaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  primaryButtonKind: PropTypes.oneOf(['primary', 'ghost']),
  primaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  primaryButtonText: PropTypes.string,
  productive: PropTypes.bool,
  secondaryButtonDisabled: PropTypes.bool,
  secondaryButtonHref: PropTypes.string,
  /**@ts-ignore */
  secondaryButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  secondaryButtonKind: PropTypes.oneOf(['secondary', 'ghost']),
  secondaryButtonPlacement: PropTypes.oneOf(['top', 'bottom']),
  secondaryButtonText: PropTypes.string,
  sequence: PropTypes.number,

  /**
   * **Experimental:** For all cases a `Slug` component can be provided.
   * Clickable tiles only accept a boolean value of true and display a hollow slug.
   * @deprecated please use the `decorator` prop
   */
  slug: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

  status: PropTypes.oneOf(['complete', 'incomplete']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleSize: PropTypes.oneOf(['default', 'large']),
};

Card.displayName = componentName;
