/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Text } from '../Text';
import { useFeatureFlag } from '../FeatureFlags';
import deprecate from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';

const Checkbox = React.forwardRef(function Checkbox(
  {
    className,
    id,
    labelText,
    onChange,
    onClick,
    indeterminate,
    hideLabel,
    wrapperClassName,
    title = '',
    ...other
  },
  ref
) {
  const enabled = useFeatureFlag('enable-v11-release');
  const prefix = usePrefix();

  const labelClasses = classNames(`${prefix}--checkbox-label`, [
    enabled ? null : className,
  ]);
  const innerLabelClasses = classNames(`${prefix}--checkbox-label-text`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const wrapperClasses = classNames(
    `${prefix}--form-item`,
    `${prefix}--checkbox-wrapper`,
    [enabled ? className : wrapperClassName]
  );

  return (
    /* 
      The a11y rules below are disabled because <div> element has checkbox 
      input and label elements as children that allows keyboard interaction. 
      The onClick handler facilitates consumers' ability to stop click events 
      from bubbling beyond the checkbox without having to implement their own 
      wrapper element around <Checkbox>.
    */
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    <div className={wrapperClasses} onClick={(evt) => onClick(evt)}>
      <input
        {...other}
        type="checkbox"
        onChange={(evt) => {
          if (enabled) {
            onChange(evt, { checked: evt.target.checked, id });
          } else {
            onChange(evt.target.checked, id, evt);
          }
        }}
        className={`${prefix}--checkbox`}
        id={id}
        ref={(el) => {
          if (el) {
            el.indeterminate = indeterminate;
          }
          if (typeof ref === 'function') {
            ref(el);
          } else if (Object(ref) === ref) {
            ref.current = el;
          }
        }}
      />
      <label htmlFor={id} className={labelClasses} title={title || null}>
        <Text className={innerLabelClasses}>{labelText}</Text>
      </label>
    </div>
  );
});

Checkbox.propTypes = {
  /**
   * Specify whether the underlying input should be checked
   */
  checked: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the <label> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Receives three arguments: true/false, the checkbox's id, and the dom event.
   * `(value, id, event) => console.log({value, id, event})`
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional click handler that is applied to the wrapper div
   * containing both the input and the span label. As such, this will be
   * called twice for every click - once for the input, a second time for the label.
   * Receives the dom event as its only argument.
   */
  onClick: PropTypes.func,

  /**
   * Specify a title for the <label> node for the Checkbox
   */
  title: PropTypes.string,

  /**
   * The CSS class name to be placed on the wrapping element
   */
  wrapperClassName: deprecate(
    PropTypes.string,
    `\nThe prop \`wrapperClassName\` for Checkbox will be deprecated in V11 in favor of \`className\`. \`className\` will then be placed on the outer wrapper.`
  ),
};

Checkbox.defaultProps = {
  onChange: () => {},
  onClick: () => {},
  indeterminate: false,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
