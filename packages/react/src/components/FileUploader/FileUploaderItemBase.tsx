/**
 * Copyright IBM Corp. 2026
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

export interface FileUploaderItemBaseProps
  extends HTMLAttributes<HTMLSpanElement> {
  errorBody?: string;
  errorSubject?: string;
  iconDescription?: string;
  invalid?: boolean;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'uploading' | 'edit' | 'complete';
  renderName?: (props: { name: string | undefined }) => React.ReactNode;
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
}: FileUploaderItemBaseProps) {
  const prefix = usePrefix();
  const classes = cx(`${prefix}--file__selected-file`, className, {
    [`${prefix}--file__selected-file--invalid`]: invalid,
    [`${prefix}--file__selected-file--md`]: size === 'md',
    [`${prefix}--file__selected-file--sm`]: size === 'sm',
  });

  const removeSpaces = (value: string | undefined) =>
    value?.replace(/\s+/g, '');

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
                ? `${removeSpaces(name)}-id-error`
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
          id={`${removeSpaces(name)}-id-error`}>
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
  errorBody: PropTypes.string,
  errorSubject: PropTypes.string,
  iconDescription: PropTypes.string,
  invalid: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  status: PropTypes.oneOf(['uploading', 'edit', 'complete']),
  renderName: PropTypes.func,
  renderActions: PropTypes.func,
};

export default FileUploaderItemBase;
