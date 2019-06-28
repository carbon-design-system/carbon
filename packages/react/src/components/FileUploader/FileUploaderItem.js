import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { Filename } from './FileUploader';
import { keys, matches } from '../../tools/key';

const { prefix } = settings;

export default function FileUploaderItem({
  uuid,
  name,
  status,
  iconDescription,
  onDelete,
  invalid,
  errorMessage: ErrorMessage,
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
            if (matches(evt, [keys.ENTER, keys.SPACE])) {
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
      {invalid && <ErrorMessage />}
    </span>
  );
}

FileUploaderItem.propTypes = {
  /**
   * An object which represents a file contained in the file uplodaer
   * `file.name` - file name
   * `file.status` - status of the file upload
   * `file.iconDescription` - description of status icon (displayed in
   * native tooltip)
   */
  file: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.oneOf(['uploading', 'edit', 'complete']),
    iconDescription: PropTypes.string,
  }),
};

FileUploaderItem.defaultProps = {
  status: 'uploading',
};
