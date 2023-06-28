/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Filename from './Filename';
import { keys, matches } from '../../internal/keyboard';
import uid from '../../tools/uniqueId';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';

export interface FileUploaderItemProps extends ReactAttr<HTMLSpanElement> {
  /**
   * Error message body for an invalid file upload
   */
  errorBody?: string;

  /**
   * Error message subject for an invalid file upload
   */
  errorSubject?: string;

  /**
   * Description of status icon (displayed in native tooltip)
   */
  iconDescription?: string;

  /**
   * Specify if the currently uploaded file is invalid
   */
  invalid?: boolean;

  /**
   * Name of the uploaded file
   */
  name?: string;

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete?: (event: any, opts: { uuid: string }) => void;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Status of the file upload
   */
  status?: 'uploading' | 'edit' | 'complete';

  /**
   * Unique identifier for the file object
   */
  uuid?: string;
}

function FileUploaderItem({
  uuid,
  name,
  status,
  iconDescription,
  onDelete,
  invalid,
  errorSubject,
  errorBody,
  size,
  ...other
}) {
  const prefix = usePrefix();
  const { current: id } = useRef(uuid || uid());
  const classes = cx(`${prefix}--file__selected-file`, {
    [`${prefix}--file__selected-file--invalid`]: invalid,
    [`${prefix}--file__selected-file--md`]: size === 'field' || size === 'md',
    [`${prefix}--file__selected-file--sm`]: size === 'small' || size === 'sm',
  });
  return (
    <span className={classes} {...other}>
      <p className={`${prefix}--file-filename`} title={name} id={name}>
        {name}
      </p>
      <span className={`${prefix}--file__state-container`}>
        <Filename
          name={name}
          iconDescription={iconDescription}
          status={status}
          invalid={invalid}
          aria-describedby={`${name}-id-error`}
          onKeyDown={(evt) => {
            if (matches(evt as unknown as Event, [keys.Enter, keys.Space])) {
              if (status === 'edit') {
                evt.preventDefault();
                onDelete(evt, { uuid: id });
              }
            }
          }}
          onClick={(evt) => {
            if (status === 'edit') {
              onDelete(evt, { uuid: id });
            }
          }}
        />
      </span>
      {invalid && errorSubject && (
        <div
          className={`${prefix}--form-requirement`}
          role="alert"
          id={`${name}-id-error`}>
          <div className={`${prefix}--form-requirement__title`}>
            {errorSubject}
          </div>
          {errorBody && (
            <p className={`${prefix}--form-requirement__supplement`}>
              {errorBody}
            </p>
          )}
        </div>
      )}
    </span>
  );
}

FileUploaderItem.propTypes = {
  /**
   * Error message body for an invalid file upload
   */
  errorBody: PropTypes.string,

  /**
   * Error message subject for an invalid file upload
   */
  errorSubject: PropTypes.string,

  /**
   * Description of status icon (displayed in native tooltip)
   */
  iconDescription: PropTypes.string,

  /**
   * Specify if the currently uploaded file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Name of the uploaded file
   */
  name: PropTypes.string,

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete: PropTypes.func,

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['uploading', 'edit', 'complete']),

  /**
   * Unique identifier for the file object
   */
  uuid: PropTypes.string,
};

FileUploaderItem.defaultProps = {
  status: 'uploading',
  onDelete: () => {},
};

export default FileUploaderItem;
