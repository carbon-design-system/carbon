/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import { arrayOf, shape, string } from 'prop-types';
import { pkg /*, carbon */ } from '../../settings';

// Carbon and package components we use.
import { Link } from '@carbon/react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--http-errors`;
const componentName = 'HTTPErrorContent';

export let HTTPErrorContent = ({
  description,
  errorCodeLabel,
  title,
  links,
}) => {
  return (
    <div className={`${blockClass}__content`}>
      {errorCodeLabel && (
        <p className={`${blockClass}__error-code-label`}>{errorCodeLabel}</p>
      )}
      {title && <h1 className={`${blockClass}__title`}>{title}</h1>}
      {description && (
        <p className={`${blockClass}__description`}>{description}</p>
      )}
      {links &&
        links.length &&
        links.map((link) => (
          <Link
            {...link}
            role="link"
            href={link.href}
            key={link.text}
            className={`${blockClass}__link`}
          >
            {link.text}
          </Link>
        ))}
    </div>
  );
};

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
HTTPErrorContent.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
HTTPErrorContent.propTypes = {
  /**
   * String that will provide the description for the HTTP error code
   */
  description: string.isRequired,
  /**
   * String that will describe the error that occurred
   */
  errorCodeLabel: string.isRequired,
  /**
   * Links that will display for extra context when receiving particular errors
   */
  links: arrayOf(
    shape({
      ...Link.propTypes,
      /**
       * The text to display for the link
       */
      text: string.isRequired,
      /**
       * The link's destination
       */
      href: string.isRequired,
    })
  ),
  /**
   * This will be for the main title of the HTTP error component
   */
  title: string.isRequired,
};
