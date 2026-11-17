/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ComponentType, type HTMLAttributes } from 'react';
import { Button, Link } from '@carbon/react';
import './EmptyState.scss';

const blockClass = 'cds--empty-state';

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional action button rendered below the subtitle. */
  action?: { text: string; onClick?: React.MouseEventHandler<HTMLButtonElement> };
  /**
   * Illustration to display. Pass an image `src` string, or a React component
   * (e.g. a Carbon pictogram or a custom SVG component).
   */
  illustration?: string | ComponentType<{ className?: string }>;
  /** Optional link rendered below the action button. */
  link?: { text: React.ReactNode; href: string; target?: string };
  /**
   * Size variant — controls illustration dimensions.
   * @default 'md'
   */
  size?: 'md' | 'sm';
  /** Subtitle / body copy shown below the heading. */
  subtitle?: React.ReactNode;
  /** Main heading text (required). */
  title: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { action, illustration, link, size = 'md', subtitle, title, ...rest },
    ref
  ) {
    const rootClasses = cx(blockClass, {
      [`${blockClass}--${size}`]: size,
    });

    let illustrationNode: React.ReactNode = null;
    if (illustration) {
      if (typeof illustration === 'string') {
        illustrationNode = (
          <img
            src={illustration}
            alt=""
            className={`${blockClass}__illustration--${size}`}
          />
        );
      } else {
        const IllustrationComponent = illustration;
        illustrationNode = (
          <IllustrationComponent
            className={`${blockClass}__illustration--${size}`}
          />
        );
      }
    }

    return (
      <div {...rest} ref={ref} className={rootClasses}>
        {illustrationNode}
        <div className={`${blockClass}__content`}>
          <p
            className={cx(
              `${blockClass}__heading`,
              `${blockClass}__heading--${size}`
            )}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className={cx(`${blockClass}__subtitle`, {
                [`${blockClass}__subtitle--sm`]: size === 'sm',
              })}
            >
              {subtitle}
            </p>
          )}
          {action?.text && (
            <Button
              onClick={action.onClick}
              className={`${blockClass}__action`}
              kind="tertiary"
              size="sm"
            >
              {action.text}
            </Button>
          )}
          {link?.text && link?.href && (
            <Link
              href={link.href}
              target={link.target}
              className={`${blockClass}__link`}
            >
              {link.text}
            </Link>
          )}
        </div>
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
