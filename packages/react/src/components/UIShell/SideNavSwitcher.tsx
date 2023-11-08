/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ChangeEventHandler, forwardRef } from 'react';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

interface SideNavSwitcherProps {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Provide the label for the switcher. This will be the first visible option
   * when someone views this control
   */
  labelText: string;

  /**
   * Provide a callback function that is called whenever the switcher value is
   * updated
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>;

  /**
   * Provide an array of options to be rendered in the switcher as an
   * `<option>`. The text value will be what is displayed to the user and is set
   * as the `value` prop for each `<option>`.
   */
  options: string[];
}

const SideNavSwitcher = forwardRef<HTMLSelectElement, SideNavSwitcherProps>(
  function SideNavSwitcher(props, ref) {
    const id = useId('side-nav-switcher');
    const prefix = usePrefix();
    const { className: customClassName, labelText, onChange, options } = props;
    const className = cx(`${prefix}--side-nav__switcher`, customClassName);

    // Note for usage around `onBlur`: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md
    return (
      <div className={className}>
        <label htmlFor={id} className={`${prefix}--assistive-text`}>
          {labelText}
        </label>
        <select
          id={id}
          className={`${prefix}--side-nav__select`}
          defaultValue=""
          onBlur={onChange}
          onChange={onChange}
          ref={ref}>
          <option
            className={`${prefix}--side-nav__option`}
            disabled
            hidden
            value="">
            {labelText}
          </option>
          {options.map((option) => (
            <option
              key={option}
              className={`${prefix}--side-nav__option`}
              value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className={`${prefix}--side-nav__switcher-chevron`}>
          <ChevronDown size={20} />
        </div>
      </div>
    );
  }
);

SideNavSwitcher.displayName = 'SideNavSwitcher';
SideNavSwitcher.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide the label for the switcher. This will be the first visible option
   * when someone views this control
   */
  labelText: PropTypes.string.isRequired,

  /**
   * Provide a callback function that is called whenever the switcher value is
   * updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an array of options to be rendered in the switcher as an
   * `<option>`. The text value will be what is displayed to the user and is set
   * as the `value` prop for each `<option>`.
   */
  // @ts-expect-error
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideNavSwitcher;
