/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Link } from '@carbon/react';

const blockClass = 'cds--empty-state';

export const EmptyState = React.forwardRef(function EmptyState(
  {
    action,
    children,
    headingAs: HeadingComponent = 'h3',
    illustration,
    illustrationDescription,
    link,
    secondaryAction,
    size = 'md',
    subtitle,
    title,
    ...rest
  },
  ref
) {
  const rootClasses = cx(blockClass, {
    [`${blockClass}--${size}`]: size,
  });

  const illustrationLabel =
    illustrationDescription ?? (typeof title === 'string' ? title : undefined);

  let illustrationNode = null;
  if (illustration) {
    if (typeof illustration === 'string') {
      illustrationNode = (
        <img
          src={illustration}
          alt={illustrationLabel ?? ''}
          className={`${blockClass}__illustration--${size}`}
        />
      );
    } else {
      const IllustrationComponent = illustration;
      illustrationNode = (
        <IllustrationComponent
          className={`${blockClass}__illustration--${size}`}
          aria-label={illustrationLabel}
        />
      );
    }
  }

  return (
    <div {...rest} ref={ref} className={rootClasses}>
      {illustrationNode}
      <div className={`${blockClass}__content`}>
        <HeadingComponent
          className={cx(
            `${blockClass}__heading`,
            `${blockClass}__heading--${size}`
          )}>
          {title}
        </HeadingComponent>
        {subtitle && (
          <div
            className={cx(`${blockClass}__subtitle`, {
              [`${blockClass}__subtitle--sm`]: size === 'sm',
            })}>
            {subtitle}
          </div>
        )}
        {(action?.text || secondaryAction?.text) && (
          <div className={`${blockClass}__actions`}>
            {action?.text && (
              <Button
                {...action}
                className={`${blockClass}__action`}
                kind={action.kind ?? 'tertiary'}
                renderIcon={action.renderIcon}
                size="sm">
                {action.text}
              </Button>
            )}
            {secondaryAction?.text && (
              <Button
                {...secondaryAction}
                className={`${blockClass}__action`}
                kind={secondaryAction.kind ?? 'ghost'}
                size="sm">
                {secondaryAction.text}
              </Button>
            )}
          </div>
        )}
        {link?.text && link?.href && (
          <Link {...link} className={`${blockClass}__link`}>
            {link.text}
          </Link>
        )}
        {children}
      </div>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** Optional action button rendered below the subtitle. */
  action: PropTypes.shape({
    text: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
    onClick: PropTypes.func,
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /** Custom content rendered at the end of the content container. */
  children: PropTypes.node,
  /**
   * Heading element for the title.
   * @default 'h3'
   */
  headingAs: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  /**
   * Illustration to display. Pass an image `src` string, or a React component
   * (e.g. a Carbon pictogram or a custom SVG component).
   */
  illustration: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /**
   * Accessible text for the illustration (image `alt` / pictogram
   * `aria-label`). Falls back to `title` when it is a string.
   */
  illustrationDescription: PropTypes.string,
  /** Optional link rendered below the action button. */
  link: PropTypes.shape({
    text: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
  }),
  /** Optional secondary button rendered next to `action`. Defaults to `ghost`. */
  secondaryAction: PropTypes.shape({
    text: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'ghost']),
    onClick: PropTypes.func,
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * Size variant — controls illustration dimensions.
   * @default 'md'
   */
  size: PropTypes.oneOf(['md', 'sm']),
  /** Subtitle / body copy shown below the heading. */
  subtitle: PropTypes.node,
  /** Main heading text (required). */
  title: PropTypes.node.isRequired,
};

export default EmptyState;
