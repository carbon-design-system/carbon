/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';
import { keys, matches } from '../../internal/keyboard';
import { noopFn } from '../../internal/noopFn';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import FileUploaderItemBase from './FileUploaderItemBase';

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
  renderName,
  renderActions,
  tabIndex = 0,
  ...other
}: FileUploaderItemProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);
  const prefix = usePrefix();
  const { current: id } = useRef(uuid || useId());
  const isInvalid = invalid
    ? `${prefix}--file-filename-container-wrap-invalid`
    : `${prefix}--file-filename-container-wrap`;

  const removeSpaces = (name: string | undefined) => name?.replace(/\s+/g, '');

  const isEllipsisActive = (element: any) => {
    setIsEllipsisApplied(element.offsetWidth < element.scrollWidth);
    return element.offsetWidth < element.scrollWidth;
  };
  const ariaDescribedBy =
    invalid && errorSubject ? `${removeSpaces(name)}-id-error` : undefined;

  useLayoutEffect(() => {
    if (textRef.current) {
      isEllipsisActive(textRef.current);
    }
  }, [prefix, name]);

  const defaultFileName = isEllipsisApplied ? (
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
            className={`${prefix}--file-filename`}
            id={removeSpaces(name)}>
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
      id={removeSpaces(name)}>
      {name}
    </Text>
  );

  const onKeyDown = (evt) => {
    if (matches(evt, [keys.Enter, keys.Space])) {
      if (status === 'edit') {
        evt.preventDefault();
        onDelete(evt, { uuid: id });
      }
    }
  };

  const onClick = (evt) => {
    if (status === 'edit') {
      onDelete(evt, { uuid: id });
    }
  };

  const defaultActions = status === 'edit' && (
    <button
      aria-describedby={invalid ? ariaDescribedBy : undefined}
      aria-label={`${iconDescription} - ${name}`}
      className={`${prefix}--file-close`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      type="button">
      <Close />
    </button>
  );

  const renderFileName = () =>
    renderName ? renderName({ name }) : defaultFileName;

  const renderFileActions = () =>
    renderActions ? renderActions({ name, status }) : defaultActions;

  return (
    <FileUploaderItemBase
      className={className}
      errorBody={errorBody}
      errorSubject={errorSubject}
      iconDescription={iconDescription}
      invalid={invalid}
      renderActions={renderFileActions}
      renderName={renderFileName}
      size={size}
      status={status}
      {...other}
    />
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

  /**
   * A function used to render a custom name for the file object.
   */
  renderName: PropTypes.func,

  /**
   * A function used to render a custom actions for the file object.
   */
  renderActions: PropTypes.func,
};

export default FileUploaderItem;
