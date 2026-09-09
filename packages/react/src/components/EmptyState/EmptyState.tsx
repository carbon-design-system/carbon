/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ElementType, ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import Button, { type ButtonProps } from '../Button';
import Link, { type LinkProps } from '../Link';
import { Heading, Section } from '../Heading';

export interface EmptyStateActionProps
  extends Omit<ButtonProps<React.ElementType>, 'children'> {
  /** Button label text */
  text: string;
  /** Button kind — defaults to 'tertiary' */
  kind?: 'primary' | 'secondary' | 'tertiary';
}

export interface EmptyStateLinkProps
  extends Omit<LinkProps<React.ElementType>, 'children'> {
  /** Link label text */
  text: ReactNode;
}

export interface EmptyStateProps {
  /** Optional action button rendered below the subtitle. */
  action?: EmptyStateActionProps;

  /** Optional class name applied to the root element. */
  className?: string;

  /**
   * Illustration to display. Pass an image `src` string, or a React component
   * (e.g. a Carbon pictogram or a custom SVG component).
   */
  illustration?: string | ElementType;

  /**
   * Alt text for the illustration image. Falls back to `title` when omitted.
   */
  illustrationDescription?: string;

  /** Optional link rendered below the action button. */
  link?: EmptyStateLinkProps;

  /**
   * Size variant — controls illustration dimensions.
   * @default 'md'
   */
  size?: 'md' | 'sm';

  /** Subtitle / body copy shown below the heading. */
  subtitle?: ReactNode;

  /** Main heading text (required). */
  title: ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      action,
      className,
      illustration,
      illustrationDescription,
      link,
      size = 'md',
      subtitle,
      title,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const blockClass = `${prefix}--empty-state`;

    const rootClasses = cx(blockClass, className, {
      [`${blockClass}--${size}`]: size,
    });

    // Render the illustration — either an <img> (string src) or a component
    let illustrationNode: ReactNode = null;
    if (illustration) {
      if (typeof illustration === 'string') {
        illustrationNode = (
          <img
            src={illustration}
            alt={
              illustrationDescription ??
              (typeof title === 'string' ? title : '')
            }
            className={`${blockClass}__illustration--${size}`}
            aria-hidden={!illustrationDescription}
          />
        );
      } else {
        const IllustrationComponent = illustration;
        illustrationNode = (
          <IllustrationComponent
            className={`${blockClass}__illustration--${size}`}
            aria-label={
              illustrationDescription ??
              (typeof title === 'string' ? title : undefined)
            }
          />
        );
      }
    }

    const contentNode = (
      <Section className={`${blockClass}__content`}>
        <Heading
          className={cx(
            `${blockClass}__heading`,
            `${blockClass}__heading--${size}`
          )}>
          {title}
        </Heading>
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
            className={cx(`${blockClass}__action`, action.className)}
            kind={action.kind ?? 'tertiary'}
            size="sm">
            {action.text}
          </Button>
        )}
        {link?.text && link?.href && (
          <Link {...link} className={cx(`${blockClass}__link`, link.className)}>
            {link.text}
          </Link>
        )}
      </Section>
    );

    return (
      <div {...rest} ref={ref} className={rootClasses}>
        {illustrationNode}
        {contentNode}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** Optional action button rendered below the subtitle. */
  action: PropTypes.shape({
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary'] as const),
    onClick: PropTypes.func,
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    text: PropTypes.string.isRequired,
  }) as PropTypes.Validator<EmptyStateActionProps | undefined>,

  /** Optional class name applied to the root element. */
  className: PropTypes.string,

  /** Illustration src string or component. */
  illustration: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /** Alt text for the illustration image. */
  illustrationDescription: PropTypes.string,

  /** Optional link rendered below the action button. */
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.node.isRequired,
    target: PropTypes.string,
  }) as PropTypes.Validator<EmptyStateLinkProps | undefined>,

  /** Size variant — controls illustration dimensions. */
  size: PropTypes.oneOf(['md', 'sm'] as const),

  /** Subtitle / body copy shown below the heading. */
  subtitle: PropTypes.node,

  /** Main heading text (required). */
  title: PropTypes.node.isRequired,
};

export default EmptyState;
