/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import Link from '../Link';
import Button from '../Button';

const { prefix } = settings;

const Footer = ({
  className,
  children,
  labelOne,
  linkTextOne,
  linkHrefOne,
  labelTwo,
  linkTextTwo,
  linkHrefTwo,
  buttonText,
  ...other
}) => {
  const classNames = classnames(
    `${prefix}--footer ${prefix}--footer--bottom-fixed`,
    className
  );

  const footer = children ? (
    <footer {...other} className={classNames}>
      {children}
    </footer>
  ) : (
    <footer {...other} className={classNames}>
      <div className={`${prefix}--footer-info`}>
        <div className={`${prefix}--footer-info__item`}>
          <p className={`${prefix}--footer-label`}>{labelOne}</p>
          <Link href={linkHrefOne}>{linkTextOne}</Link>
        </div>
        <div className={`${prefix}--footer-info__item`}>
          <p className={`${prefix}--footer-label`}>{labelTwo}</p>
          <Link href={linkHrefTwo}>{linkTextTwo}</Link>
        </div>
      </div>
      <div className={`${prefix}--footer-cta`}>
        <Button type="submit">{buttonText}</Button>
      </div>
    </footer>
  );

  return footer;
};

Footer.propTypes = {
  /**
   * Provide children to be rendered instead of the default footer information
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <footer> node
   */
  className: PropTypes.string,

  /**
   * Provide the label for the first footer information item
   */
  labelOne: PropTypes.string,

  /**
   * Provide the text for the first footer information item
   */
  linkTextOne: PropTypes.string,

  /**
   * Provide the href attribute for the first footer information item
   */
  linkHrefOne: PropTypes.string,

  /**
   * Provide the label for the second footer information item
   */
  labelTwo: PropTypes.string,

  /**
   * Provide the text for the second footer information item
   */
  linkTextTwo: PropTypes.string,

  /**
   * Provide the href for the second footer information item
   */
  linkHrefTwo: PropTypes.string,

  /**
   * Provide the text for the footer button
   */
  buttonText: PropTypes.string,
};

Footer.defaultProps = {
  labelOne: 'Need Help?',
  linkTextOne: 'Contact Bluemix Sales',
  linkHrefOne: '#',
  labelTwo: 'Estimate Monthly Cost',
  linkTextTwo: 'Cost Calculator',
  linkHrefTwo: '#',
  buttonText: 'Create',
};

export default Footer;
