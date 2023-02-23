/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { matches, keys } from '../../internal/keyboard';
import { ButtonKinds } from '../../prop-types/types';
import uid from '../../tools/uniqueId';
import { usePrefix } from '../../internal/usePrefix';
import * as FeatureFlags from '@carbon/feature-flags';
import deprecate from '../../prop-types/deprecate';

function noop() {}

function FileUploaderButton({
  accept,
  buttonKind = 'primary',
  className,
  disabled = false,
  disableLabelChanges = false,
  id,
  labelText: ownerLabelText = 'Add file',
  multiple = false,
  onChange = noop,
  name,
  size = 'md',
  // eslint-disable-next-line react/prop-types
  innerRef,
  ...other
}) {
  const prefix = usePrefix();
  const [labelText, setLabelText] = useState(ownerLabelText);
  const [prevOwnerLabelText, setPrevOwnerLabelText] = useState(ownerLabelText);
  const { current: inputId } = useRef(id || uid());
  const inputNode = useRef(null);
  const classes = cx(`${prefix}--btn`, className, {
    [`${prefix}--btn--${buttonKind}`]: buttonKind,
    [`${prefix}--btn--disabled`]: disabled,
    // V11: remove field, small
    [`${prefix}--btn--md`]: size === 'field' || size === 'md',
    [`${prefix}--btn--sm`]: size === 'small' || size === 'sm',
  });

  // Adjust label text state based on changes to the labelText prop
  if (ownerLabelText !== prevOwnerLabelText) {
    setLabelText(ownerLabelText);
    setPrevOwnerLabelText(ownerLabelText);
  }

  function onClick(event) {
    event.target.value = null;
    inputNode.current.click();
  }

  function onKeyDown(event) {
    if (matches(event, [keys.Enter, keys.Space])) {
      inputNode.current.click();
    }
  }

  function handleOnChange(event) {
    const files = event.target.files;
    const length = event.target.files.length;
    if (files && !disableLabelChanges) {
      if (length > 1) {
        setLabelText(`${length} files`);
      } else if (length === 1) {
        setLabelText(files[0].name);
      }
    }
    onChange(event);
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={classes}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...other}>
        {labelText}
      </button>
      <label
        className={`${prefix}--visually-hidden`}
        ref={innerRef}
        htmlFor={inputId}>
        <span>{labelText}</span>
      </label>
      <input
        className={`${prefix}--visually-hidden`}
        ref={inputNode}
        id={inputId}
        disabled={disabled}
        type="file"
        tabIndex="-1"
        multiple={multiple}
        accept={accept}
        name={name}
        onChange={handleOnChange}
      />
    </>
  );
}

FileUploaderButton.propTypes = {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the type of underlying button
   */
  buttonKind: PropTypes.oneOf(ButtonKinds),

  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether you want to disable any updates to the FileUploaderButton
   * label
   */
  disableLabelChanges: PropTypes.bool,

  /**
   * Specify whether file input is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText: PropTypes.node,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the `<input>`
   * value changes
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an accessibility role for the `<FileUploaderButton>`
   */
  role: PropTypes.string,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: FeatureFlags.enabled('enable-v11-release')
    ? PropTypes.oneOf(['sm', 'md', 'lg'])
    : PropTypes.oneOf(['default', 'field', 'small', 'sm', 'md', 'lg']),

  /**
   * Provide a custom tabIndex value for the `<FileUploaderButton>`
   */
  tabIndex: deprecate(
    PropTypes.number,
    'The `tabIndex` prop for `FileUploaderButton` has ' +
      'been deprecated since it now renders a button element by default.'
  ),
};

export default FileUploaderButton;
