/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ElementType, ReactNode } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import { pkg } from '../../settings';
import cx from 'classnames';

// Carbon and package components we use.
import { Button, Heading, Link, Section } from '@carbon/react';
import { CustomLink, EmptyStateAction } from './EmptyState';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--empty-state`;
const componentName = 'EmptyStateContent';
interface EmptyStateProps {
  /**
   * Empty state action button
   */
  action?: EmptyStateAction;
  /**
   * Empty state headingAs allows you to customize the type of heading element
   */
  headingAs?: (() => ReactNode) | string | ElementType;
  /**
   * Empty state link object
   */
  link?: CustomLink;
  /**
   * Empty state size
   */
  size?: 'lg' | 'sm';
  /**
   * Empty state subtitle
   */
  subtitle?: ReactNode;
  /**
   * Empty state title
   */
  title: ReactNode;
}

export const EmptyStateContent = (props: EmptyStateProps) => {
  const { action, link, headingAs, size, subtitle, title } = props;
  const HeadingComponent = headingAs ?? Heading;

  return (
    <Section className={`${blockClass}__content`}>
      <HeadingComponent
        className={cx(`${blockClass}__header`, {
          [`${blockClass}__header--small`]: size === 'sm',
        })}
      >
        {title}
      </HeadingComponent>
      {subtitle && (
        <div
          className={cx(`${blockClass}__subtitle`, {
            [`${blockClass}__subtitle--small`]: size === 'sm',
          })}
        >
          {subtitle}
        </div>
      )}
      {action?.text && action?.onClick && (
        <Button
          {...action}
          className={`${blockClass}__action-button`}
          kind={action.kind || 'tertiary'}
          onClick={action.onClick}
          renderIcon={action.renderIcon ?? undefined}
          size={'sm'}
        >
          {action.text}
        </Button>
      )}
      {link?.text && link?.href && (
        <Link {...link} className={`${blockClass}__link`} href={link.href}>
          {link.text}
        </Link>
      )}
    </Section>
  );
};

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
EmptyStateContent.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
EmptyStateContent.propTypes = {
  /**
   * Empty state action button
   */
  action: PropTypes.shape({
    /**@ts-ignore*/
    ...Button.propTypes,
    iconDescription: PropTypes.string,
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**@ts-ignore*/
    onClick: Button.propTypes.onClick,
    text: PropTypes.string,
  }),
  /**
   * Empty state headingAs allows you to customize the type of heading element
   */
  headingAs: PropTypes.elementType,
  /**
   * Empty state link object
   */
  link: PropTypes.any,
  /**
   * Empty state size
   */
  size: PropTypes.oneOf(['lg', 'sm']),
  /**
   * Empty state subtitle
   */
  subtitle: PropTypes.node,
  /**
   * Empty state title
   */
  title: PropTypes.node.isRequired,
};
