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
import { preview__Card, usePrefix } from '@carbon/react';

// `preview__Card` is a namespace export; the composable Card is its `Card`.
const { Card } = preview__Card;

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
   * Decorative element, for example an icon, placed at the top-right of the
   * card's content area. Its click and key events don't activate the card.
   */
  decorator?: ReactNode;
  /** Disables the card. */
  disabled?: boolean;
  /** Icon rendered at the trailing edge of the card. Defaults to ArrowRight. */
  footerActionIcon?: ElementType;
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
  /** Called when the card is activated. */
  onClick?: (event: React.MouseEvent) => void;
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
 */
export const GetStartedCard = forwardRef<HTMLDivElement, GetStartedCardProps>(
  function GetStartedCard(
    {
      className,
      decorator,
      disabled = false,
      footerActionIcon,
      horizontal = false,
      label,
      media,
      metadata = [],
      onClick,
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
    const isHorizontal = horizontal && !!media;

    const headerMedia = hasSequence ? (
      <span id={sequenceId} className={`${blockClass}__sequence`}>
        {sequence}
      </span>
    ) : (
      Pictogram && <Pictogram size={32} aria-hidden="true" />
    );

    return (
      <Card
        {...rest}
        ref={ref}
        className={cx(blockClass, className, {
          [`${blockClass}--with-media`]: media && !isHorizontal,
          [`${blockClass}--horizontal`]: isHorizontal,
        })}
        clickable
        decorator={decorator}
        disabled={disabled}
        horizontal={isHorizontal}
        onClick={onClick}
        renderFooterIcon={footerActionIcon}
        aria-labelledby={hasSequence ? `${sequenceId} ${titleId}` : titleId}>
        <Card.Header headerMedia={headerMedia}>
          <Card.Title id={titleId} label={label}>
            {title}
          </Card.Title>
        </Card.Header>
        {media && !isHorizontal && (
          <div className={`${blockClass}__media`}>{media}</div>
        )}
        <Card.Body>
          <div className={`${blockClass}__meta`}>
            {metadata.map(({ id, icon: Icon, iconDescription }) => (
              <span key={id} className={`${blockClass}__meta-item`}>
                <Icon size={16} aria-hidden="true" />
                {iconDescription}
              </span>
            ))}
          </div>
        </Card.Body>
        {isHorizontal && <Card.Media>{media}</Card.Media>}
      </Card>
    );
  }
);
