/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useId,
  type ElementType,
  type ReactNode,
} from 'react';
import cx from 'classnames';
import { IconButton, preview__Card, usePrefix } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

// `preview__Card` is a namespace export; the composable Card is its `Card`.
const { Card } = preview__Card;

export interface GetStartedCardHeaderAction {
  /** Unique key for the action. */
  id: string;
  /** Icon rendered inside the action button. */
  icon: ElementType;
  /** Accessible label and tooltip of the action button. */
  label: string;
  /** Called when the action button is activated. */
  onClick?: (event: React.MouseEvent) => void;
}

export interface GetStartedCardMetadata {
  /** Unique key for the metadata item. */
  id: string;
  /** Icon rendered before the description. */
  icon: ElementType;
  /** Text describing the item, for example `2 mins` or `Beginner`. */
  iconDescription: string;
}

export interface GetStartedCardProps {
  /** Additional class applied to the card. */
  className?: string;
  /**
   * Makes the whole card the interactive surface. Set to `false` for a card
   * whose footer holds a separate action button, for example when the header
   * also contains an `AILabel` or other actions. A card that is not clickable
   * ignores `media`, `horizontal` and `onClick`.
   */
  clickable?: boolean;
  /**
   * Element placed at the top-right of the card's content area, for example a
   * decorative icon or an `AILabel`. Its click and key events don't activate a
   * clickable card.
   */
  decorator?: ReactNode;
  /** Disables the card. */
  disabled?: boolean;
  /** Icon rendered at the trailing edge of the card. Defaults to ArrowRight. */
  footerActionIcon?: ElementType;
  /**
   * Accessible label of the footer button. Only used when `clickable` is
   * `false`.
   */
  footerActionLabel?: string;
  /**
   * Icon buttons shown at the top-right of the header, next to the `decorator`.
   * Only used when `clickable` is `false`.
   */
  headerActions?: GetStartedCardHeaderAction[];
  /**
   * Renders the media as a full-height `Card.Media` column at the trailing edge
   * of the card, instead of beside the header. Requires `media`.
   */
  horizontal?: boolean;
  /** Label displayed above the title. */
  label?: ReactNode;
  /**
   * Decorative media, for example an `<img>`, placed beside the header. It is
   * hidden below the `lg` breakpoint.
   */
  media?: ReactNode;
  /** Time and skill level shown at the bottom of the card. */
  metadata?: GetStartedCardMetadata[];
  /** Called when a clickable card is activated. */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * Called when the footer button is activated. Only used when `clickable` is
   * `false`.
   */
  onFooterActionClick?: (event: React.MouseEvent) => void;
  /** Pictogram displayed at the top of the card. Ignored when `sequence` is set. */
  pictogram?: ElementType;
  /** Step number displayed at the top of the card in place of a pictogram. */
  sequence?: number | string;
  /** Card title. */
  title: ReactNode;
}

/**
 * GetStartedCard pattern composed from the composable `Card` component.
 *
 * - `Card.Header`'s `headerMedia` holds the pictogram, or the sequence number
 *   when `sequence` is provided.
 * - `media` sits beside the header and may bleed past the card's top and
 *   bottom edges. With `horizontal`, it fills a `Card.Media` column at the
 *   trailing edge of the card instead.
 * - `Card.Title` renders the label above the title.
 * - `Card.Body` holds the metadata row (time and skill level).
 * - A clickable `Card` renders the trailing arrow affordance itself and makes
 *   the whole surface keyboard and pointer interactive.
 * - With `clickable={false}`, the metadata moves into `Card.Footer` next to a
 *   separate arrow `IconButton`, and `headerActions` and `decorator` (for
 *   example an `AILabel`) share the top-right of the header.
 */
export const GetStartedCard = forwardRef<HTMLDivElement, GetStartedCardProps>(
  function GetStartedCard(
    {
      className,
      clickable = true,
      decorator,
      disabled = false,
      footerActionIcon: FooterActionIcon = ArrowRight,
      footerActionLabel = 'Open',
      headerActions = [],
      horizontal: horizontalProp = false,
      label,
      media: mediaProp,
      metadata = [],
      onClick,
      onFooterActionClick,
      pictogram: Pictogram,
      sequence,
      title,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const blockClass = `${prefix}--get-started-card`;
    const titleId = useId();
    const sequenceId = useId();
    const hasSequence = sequence !== undefined && sequence !== null;
    // Media only applies to the clickable layouts.
    const media = clickable ? mediaProp : undefined;
    const isHorizontal = clickable && horizontalProp && !!media;

    const headerMedia = hasSequence ? (
      <span id={sequenceId} className={`${blockClass}__sequence`}>
        {sequence}
      </span>
    ) : (
      Pictogram && <Pictogram size={32} aria-hidden="true" />
    );

    const metaRow = (
      <div className={`${blockClass}__meta`}>
        {metadata.map(({ id, icon: Icon, iconDescription }) => (
          <span key={id} className={`${blockClass}__meta-item`}>
            <Icon size={16} aria-hidden="true" />
            {iconDescription}
          </span>
        ))}
      </div>
    );

    const actions = !clickable && headerActions.length > 0 && (
      <Card.Actions>
        {headerActions.map((action) => (
          <Card.Action key={action.id}>
            <IconButton
              kind="ghost"
              size="sm"
              label={action.label}
              disabled={disabled}
              onClick={action.onClick}>
              <action.icon />
            </IconButton>
          </Card.Action>
        ))}
      </Card.Actions>
    );

    return (
      <Card
        {...rest}
        ref={ref}
        className={cx(blockClass, className, {
          [`${blockClass}--with-media`]: media && !isHorizontal,
          [`${blockClass}--horizontal`]: isHorizontal,
          [`${blockClass}--static`]: !clickable,
        })}
        clickable={clickable}
        decorator={decorator}
        disabled={disabled}
        horizontal={isHorizontal}
        onClick={clickable ? onClick : undefined}
        renderFooterIcon={clickable ? FooterActionIcon : undefined}
        // A card that is not clickable has no role, so it needs no name.
        aria-labelledby={
          clickable
            ? hasSequence
              ? `${sequenceId} ${titleId}`
              : titleId
            : undefined
        }>
        <Card.Header headerMedia={headerMedia} actions={actions || undefined}>
          <Card.Title id={titleId} label={label}>
            {title}
          </Card.Title>
        </Card.Header>
        {media && !isHorizontal && (
          <div className={`${blockClass}__media`}>{media}</div>
        )}
        {clickable ? (
          <Card.Body>{metaRow}</Card.Body>
        ) : (
          <Card.Footer>
            {metaRow}
            <IconButton
              kind="ghost"
              size="sm"
              label={footerActionLabel}
              disabled={disabled}
              onClick={onFooterActionClick}>
              <FooterActionIcon />
            </IconButton>
          </Card.Footer>
        )}
        {isHorizontal && <Card.Media>{media}</Card.Media>}
      </Card>
    );
  }
);
