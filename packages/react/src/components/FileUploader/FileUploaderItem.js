import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { Filename } from './FileUploader';
import { keys, matches } from '../../internal/keyboard';

const { prefix } = settings;

export default function FileUploaderItem({
  uuid,
  name,
  status,
  iconDescription,
  onDelete,
  invalid,
  errorSubject,
  errorBody,
  ...other
}) {
  const classes = classNames(`${prefix}--file__selected-file`, {
    [`${prefix}--file__selected-file--invalid`]: invalid,
  });
  return (
    <span className={classes} {...other}>
      <p className={`${prefix}--file-filename`}>{name}</p>
      <span className={`${prefix}--file__state-container`}>
        <Filename
          iconDescription={iconDescription}
          status={status}
          onKeyDown={evt => {
            if (matches(evt, [keys.Enter, keys.Space])) {
              if (status === 'edit') {
                onDelete(evt, { uuid });
              }
            }
          }}
          onClick={evt => {
            if (status === 'edit') {
              onDelete(evt, { uuid });
            }
          }}
        />
      </span>
      {invalid && (
        <div className={`${prefix}--form-requirement`}>
          {errorSubject}
          <p className={`${prefix}--form-requirement__supplement`}>
            {errorBody}
          </p>
        </div>
      )}
    </span>
  );
}

FileUploaderItem.propTypes = {
  /**
   * Unique identifier for the file object
   */
  uuid: PropTypes.string.isRequired,

  /**
   * Name of the uploaded file
   */
  name: PropTypes.string,

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['uploading', 'edit', 'complete']),

  /**
   * Description of status icon (displayed in native tooltip)
   */
  iconDescription: PropTypes.string,

  /**
   * Specify if the currently uploaded file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Event handler that is called after removing a file from the file uploader
   * The event handler signature looks like `onDelete(evt, { uuid })`
   */
  onDelete: PropTypes.func,

  /**
   * Error message subject for an invalid file upload
   */
  errorSubject: PropTypes.string,

  /**
   * Error message body for an invalid file upload
   */
  errorBody: PropTypes.string,
};

FileUploaderItem.defaultProps = {
  uuid: `${Math.random()}`,
  status: 'uploading',
  onDelete: () => {},
};
