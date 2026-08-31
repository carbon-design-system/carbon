/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, isValidElement, useCallback, useMemo } from 'react';
import cx from 'classnames';
import { ArrowRight } from '@carbon/icons-react';
import { AILabel } from '../AILabel';
import { CardProps } from './Card.types';
import { CardContext } from './CardContext';
import { usePrefix } from '../../internal/usePrefix';

// Import separated child components
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

// Import header primitive components
import { CardHeaderMedia } from './CardHeaderMedia';
import { CardMedia } from './CardMedia';
import { CardTitle } from './CardTitle';
import { CardTitleMedia } from './CardTitleMedia';
import { CardActions } from './CardActions';
import { CardAction } from './CardAction';

const componentName = 'Card';

/**
 * Card component - Root container for composable card
 */
const CardComponent = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      as,
      clickable = false,
      onClick,
      onKeyDown,
      disabled = false,
      density = 'productive',
      decorator,
      horizontal = false,
      renderFooterIcon: FooterIcon = ArrowRight,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--card`;

    // Detect if decorator is AILabel — used for the --has-ai-label CSS modifier.
    const hasAILabel = useMemo(
      () => isValidElement(decorator) && decorator.type === AILabel,
      [decorator]
    );

    // Warn when clickable-only props are used without clickable.
    if (FooterIcon !== ArrowRight && !clickable) {
      // eslint-disable-next-line no-console
      console.error(
        '[Card] `renderFooterIcon` only has effect when `clickable` is true.'
      );
    }

    // Warn when a clickable card has no accessible name.
    if (clickable && !rest['aria-label'] && !rest['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.error(
        '[Card] A clickable card must have an accessible name. ' +
          'Pass `aria-label` or `aria-labelledby` to the Card.'
      );
    }

    // Create context value — include onClick so CardFooter can detect misuse.
    const contextValue = useMemo(
      () => ({
        clickable,
        disabled,
        decorator,
        horizontal,
        onClick,
      }),
      [clickable, disabled, decorator, horizontal, onClick]
    );

    // Handle keyboard interaction for clickable cards (not needed for native <a>).
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (
          clickable &&
          !disabled &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent);
        }
        onKeyDown?.(event);
      },
      [clickable, disabled, onClick, onKeyDown]
    );

    // Handle click for clickable cards.
    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (!disabled) {
          onClick?.(event);
        }
      },
      [disabled, onClick]
    );

    const cardClasses = cx(blockClass, className, {
      [`${blockClass}--clickable`]: clickable && !disabled,
      [`${blockClass}--disabled`]: disabled,
      [`${blockClass}--${density}`]: density,
      [`${blockClass}--has-ai-label`]: hasAILabel,
      [`${blockClass}--horizontal`]: horizontal,
    });

    // Resolve the root element: adopt the `as` prop, fall back to 'div'.
    const BaseComponent = (as ?? 'div') as React.ElementType;

    // For non-anchor elements the card needs role/keyboard props when clickable.
    // Native <a> handles click and keyboard natively — no role override needed.
    const isAnchor = BaseComponent === 'a';

    const cardProps = {
      ...rest,
      ref,
      className: cardClasses,
      ...(disabled && { 'aria-disabled': true }),
      ...(clickable && {
        ...(isAnchor
          ? {
              // Native anchor: keyboard + click handled by the browser.
              onClick: handleClick,
            }
          : {
              // Non-anchor interactive surface.
              role: 'button',
              tabIndex: disabled ? -1 : 0,
              onClick: handleClick,
              onKeyDown: handleKeyDown,
              'aria-disabled': disabled,
            }),
      }),
    };

    // In horizontal mode, split children into media and content, then order
    // them by the position of Card.Media in the JSX — media before content
    // children = left, media after content children = right.
    const { mediaChildren, contentChildren, mediaIsFirst } = useMemo(() => {
      if (!horizontal) {
        return { mediaChildren: [], contentChildren: [], mediaIsFirst: false };
      }

      const childArray = React.Children.toArray(children);
      const isMedia = (child: React.ReactNode) =>
        React.isValidElement(child) && child.type === CardMedia;

      const media = childArray.filter(isMedia);
      const content = childArray.filter((c) => !isMedia(c));
      const firstMediaIndex = childArray.findIndex(isMedia);
      const firstContentIndex = childArray.findIndex((c) => !isMedia(c));

      return {
        mediaChildren: media,
        contentChildren: content,
        mediaIsFirst: firstMediaIndex < firstContentIndex,
      };
    }, [children, horizontal]);

    let renderedChildren: React.ReactNode = children;
    if (horizontal) {
      const contentWrapper = (
        <div className={`${blockClass}__content`}>{contentChildren}</div>
      );
      renderedChildren = mediaIsFirst ? (
        <>
          {mediaChildren}
          {contentWrapper}
        </>
      ) : (
        <>
          {contentWrapper}
          {mediaChildren}
        </>
      );
    }

    return (
      <CardContext.Provider value={contextValue}>
        <BaseComponent {...cardProps}>
          {renderedChildren}
          {clickable && (
            <div
              className={`${blockClass}__clickable-footer`}
              aria-hidden="true">
              <FooterIcon aria-hidden="true" />
            </div>
          )}
        </BaseComponent>
      </CardContext.Provider>
    );
  }
);

CardComponent.displayName = componentName;

/**
 * -------
 * Exports
 * -------
 */

// Create namespaced child components
const Header = CardHeader;
Header.displayName = 'Card.Header';

const Body = CardBody;
Body.displayName = 'Card.Body';

const Footer = CardFooter;
Footer.displayName = 'Card.Footer';

const HeaderMedia = CardHeaderMedia;
HeaderMedia.displayName = 'Card.HeaderMedia';

const Media = CardMedia;
Media.displayName = 'Card.Media';

const Title = CardTitle;
Title.displayName = 'Card.Title';

const TitleMedia = CardTitleMedia;
TitleMedia.displayName = 'Card.TitleMedia';

const Actions = CardActions;
Actions.displayName = 'Card.Actions';

const Action = CardAction;
Action.displayName = 'Card.Action';

// Attach child components to Card for namespaced usage (Card.Header, Card.Body, etc.)
export const Card = Object.assign(CardComponent, {
  Header,
  Body,
  Footer,
  HeaderMedia,
  Media,
  Title,
  TitleMedia,
  Actions,
  Action,
});

export {
  Card as default,
  CardHeader,
  CardBody,
  CardFooter,
  CardHeaderMedia,
  CardMedia,
  CardTitle,
  CardTitleMedia,
  CardActions,
  CardAction,
};

export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './Card.types';

// Export primitive component prop types
export type { CardHeaderMediaProps } from './CardHeaderMedia';
export type { CardMediaProps } from './CardMedia';
export type { CardTitleProps } from './CardTitle';
export type { CardTitleMediaProps } from './CardTitleMedia';
export type { CardActionsProps } from './CardActions';
export type { CardActionProps } from './CardAction';
