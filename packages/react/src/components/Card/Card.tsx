/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, isValidElement, useCallback, useMemo } from 'react';
import cx from 'classnames';
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
      clickable = false,
      onClick,
      onKeyDown,
      disabled = false,
      density = 'productive',
      decorator,
      horizontal = false,
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

    // Create context value
    const contextValue = useMemo(
      () => ({
        clickable,
        disabled,
        decorator,
        horizontal,
      }),
      [clickable, disabled, decorator, horizontal]
    );

    // Handle keyboard interaction for clickable cards
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (
          clickable &&
          !disabled &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
        onKeyDown?.(event);
      },
      [clickable, disabled, onClick, onKeyDown]
    );

    // Handle click for clickable cards
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
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

    const cardProps = {
      ...rest,
      ref,
      className: cardClasses,
      ...(clickable && {
        role: 'button',
        tabIndex: disabled ? -1 : 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        'aria-disabled': disabled,
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
        <div {...cardProps}>{renderedChildren}</div>
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
