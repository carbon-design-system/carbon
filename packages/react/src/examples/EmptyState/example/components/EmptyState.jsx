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
  { action, illustration, link, size = 'md', subtitle, title, ...rest },
  ref
) {
  const rootClasses = cx(blockClass, {
    [`${blockClass}--${size}`]: size,
  });

  let illustrationNode = null;
  if (illustration) {
    if (typeof illustration === 'string') {
      illustrationNode = (
        <img
          src={illustration}
          alt={typeof title === 'string' ? title : ''}
          className={`${blockClass}__illustration--${size}`}
        />
      );
    } else {
      const IllustrationComponent = illustration;
      illustrationNode = (
        <IllustrationComponent
          className={`${blockClass}__illustration--${size}`}
          aria-label={typeof title === 'string' ? title : undefined}
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
          )}>
          {title}
        </p>
        {subtitle && (
          <p
            className={cx(`${blockClass}__subtitle`, {
              [`${blockClass}__subtitle--sm`]: size === 'sm',
            })}>
            {subtitle}
          </p>
        )}
        {action?.text && (
          <Button
            {...action}
            className={`${blockClass}__action`}
            kind="tertiary"
            size="sm">
            {action.text}
          </Button>
        )}
        {link?.text && link?.href && (
          <Link {...link} className={`${blockClass}__link`}>
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** Optional action button rendered below the subtitle. */
  action: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  /**
   * Illustration to display. Pass an image `src` string, or a React component
   * (e.g. a Carbon pictogram or a custom SVG component).
   */
  illustration: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** Optional link rendered below the action button. */
  link: PropTypes.shape({
    text: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
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
