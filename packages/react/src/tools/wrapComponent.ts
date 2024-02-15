/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../internal/usePrefix';
import { ReactAttr } from '../types/common';

type HTMLTagName = keyof HTMLElementTagNameMap;

type WrapComponentArgs<T extends HTMLTagName> = {
  name: string;
  type: T;
  className?: string | ((prefix: string) => string);
};

/**
 * @param {{ name: string, type: string, className?: string | (prefix: string) => string }} props
 * @returns
 */
const wrapComponent = <T extends HTMLTagName>({
  name,
  className: getClassName,
  type,
}: WrapComponentArgs<T>): ((props: ReactAttr<T>) => React.ReactElement) => {
  /**
   *
   * @param {{ className?: string, [x: string]: any}} param0
   * @returns
   */
  function Component({ className: baseClassName, ...other }) {
    const prefix = usePrefix();
    const componentClass = cx(
      typeof getClassName === 'function' ? getClassName(prefix) : getClassName,
      baseClassName
    );

    return React.createElement(type, {
      ...other,
      // Prevent Weird quirk where `cx` will evaluate to an empty string, '',
      // and so we have empty `class` attributes in the resulting markup
      // eslint-disable-next-line no-extra-boolean-cast
      className: !!componentClass ? componentClass : undefined,
    });
  }

  Component.displayName = name;
  Component.propTypes = {
    className: PropTypes.string,
  };

  return Component as (props: ReactAttr<T>) => React.ReactElement;
};

export default wrapComponent;
