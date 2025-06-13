/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';
import Filename from './Filename';
import { keys, matches } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

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
   * Event handler that is called after files are added to the uploader
   */
  onAddFiles?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete?: (
    event: React.SyntheticEvent<HTMLElement>,
    opts: { uuid: string }
  ) => void;

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
  status = 'uploading',
  iconDescription,
  onDelete = noopFn,
  invalid,
  errorSubject,
  errorBody,
  size,
  className,
  ...other
}: FileUploaderItemProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);
  const prefix = usePrefix();
  const { current: id } = useRef(uuid || useId());
  const classes = cx(`${prefix}--file__selected-file`, className, {
    [`${prefix}--file__selected-file--invalid`]: invalid,
    [`${prefix}--file__selected-file--md`]: size === 'md',
    [`${prefix}--file__selected-file--sm`]: size === 'sm',
  });
  const isInvalid = invalid
    ? `${prefix}--file-filename-container-wrap-invalid`
    : `${prefix}--file-filename-container-wrap`;

  const filterSpaceName = (name: string | undefined) => {
    return name?.replace(/\s+/g, '');
  };

  const isEllipsisActive = (element: any) => {
    setIsEllipsisApplied(element.offsetWidth < element.scrollWidth);
    return element.offsetWidth < element.scrollWidth;
  };

  useLayoutEffect(() => {
    isEllipsisActive(textRef.current);
  }, [prefix, name]);

  return (
    <span className={classes} {...other}>
      {isEllipsisApplied ? (
        <div className={isInvalid}>
          <Tooltip
            label={name}
            align="bottom"
            className={`${prefix}--file-filename-tooltip`}>
            <button className={`${prefix}--file-filename-button`} type="button">
              <Text
                ref={textRef}
                as="p"
                title={name}
                className={`${prefix}--file-filename-button`}
                id={filterSpaceName(name)}>
                {name}
              </Text>
            </button>
          </Tooltip>
        </div>
      ) : (
        <Text
          ref={textRef}
          as="p"
          title={name}
          className={`${prefix}--file-filename`}
          id={filterSpaceName(name)}>
          {name}
        </Text>
      )}

      <div className={`${prefix}--file-container-item`}>
        <span className={`${prefix}--file__state-container`}>
          <Filename
            name={name}
            iconDescription={iconDescription}
            status={status}
            invalid={invalid}
            aria-describedby={
              invalid && errorSubject
                ? `${filterSpaceName(name)}-id-error`
                : undefined
            }
            onKeyDown={(evt) => {
              if (matches(evt, [keys.Enter, keys.Space])) {
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

export default FileUploaderItem;
