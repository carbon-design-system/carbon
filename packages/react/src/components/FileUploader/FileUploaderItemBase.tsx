/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';

import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import Filename from './Filename';

export interface FileUploaderItemProps extends HTMLAttributes<HTMLSpanElement> {
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
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Status of the file upload
   */
  status?: 'uploading' | 'edit' | 'complete';

  /**
   * A function used to render a custom name for the file object.
   */
  renderName?: (props: { name: string | undefined }) => React.ReactNode;

  /**
   * A function used to render a custom actions for the file object.
   */
  renderActions?: (props: {
    name: string | undefined;
    status: string;
  }) => React.ReactNode;
}
function FileUploaderItemBase({
  name,
  status = 'uploading',
  iconDescription,
  invalid,
  errorSubject,
  errorBody,
  size,
  className,
  renderName,
  renderActions,
  ...other
}: FileUploaderItemProps) {
  const prefix = usePrefix();
  const classes = cx(`${prefix}--file__selected-file`, className, {
    [`${prefix}--file__selected-file--invalid`]: invalid,
    [`${prefix}--file__selected-file--md`]: size === 'md',
    [`${prefix}--file__selected-file--sm`]: size === 'sm',
  });

  const filterSpaceName = (name: string | undefined) => {
    return name?.replace(/\s+/g, '');
  };

  return (
    <span className={classes} {...other}>
      {renderName?.({ name })}
      <div className={`${prefix}--file-container-item`}>
        <span className={`${prefix}--file__state-container`}>
          <Filename
            iconDescription={iconDescription}
            status={status}
            invalid={invalid}
            aria-describedby={
              invalid && errorSubject
                ? `${filterSpaceName(name)}-id-error`
                : undefined
            }
          />
          {renderActions?.({ name, status })}
        </span>
      </div>
      {invalid && errorSubject && (
        <div
          className={`${prefix}--form-requirement`}
          role="alert"
          id={`${filterSpaceName(name)}-id-error`}>
          <Text as="div" className={`${prefix}--form-requirement__title`}>
            {errorSubject}
          </Text>
          {errorBody && (
            <Text as="p" className={`${prefix}--form-requirement__supplement`}>
              {errorBody}
            </Text>
          )}
        </div>
      )}
    </span>
  );
}

FileUploaderItemBase.propTypes = {
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
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['uploading', 'edit', 'complete']),

  /**
   * A function used to render a custom name for the file object.
   */
  renderName: PropTypes.func,

  /**
   * A function used to render a custom actions for the file object.
   */
  renderActions: PropTypes.func,
};

export default FileUploaderItemBase;
