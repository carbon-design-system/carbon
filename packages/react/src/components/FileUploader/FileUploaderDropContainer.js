import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { keys, matches } from '../../tools/key';
import uniqueId from '../../tools/uniqueId';

const { prefix } = settings;

export default function FileUploaderDropContainer(props) {
  const inputRef = useRef();
  const {
    accept,
    className,
    id,
    disabled,
    invalid,
    labelText,
    multiple,
    name,
    onAddFiles,
    onChange,
    role,
    tabIndex,
    ...other
  } = props;
  const uid = useRef(uniqueId()).current;
  const [isActive, setActive] = useState(false);
  const classes = classNames(`${prefix}--file__drop-container`, {
    [`${prefix}--file__drop-container--drag-over`]: isActive,
    [className]: className,
  });
  const handleChange = useCallback(
    evt => {
      onAddFiles(evt, {
        addedFiles:
          evt.type === 'drop'
            ? [...evt.dataTransfer.files]
            : [...evt.target.files],
      });
      if (onChange) {
        onChange(evt);
      }
    },
    [onAddFiles, onChange]
  );
  return (
    <div
      className={`${prefix}--file`}
      onDragOver={evt => {
        evt.stopPropagation();
        evt.preventDefault();
        setActive(true);
        evt.dataTransfer.dropEffect = 'copy';
      }}
      onDragLeave={evt => {
        evt.stopPropagation();
        evt.preventDefault();
        setActive(false);
        evt.dataTransfer.dropEffect = 'move';
      }}
      onDrop={evt => {
        evt.stopPropagation();
        evt.preventDefault();
        setActive(false);
        handleChange(evt);
      }}>
      <div className={classes}>
        <p className={`${prefix}--file-filename`}>
          Drag and drop files here or{' '}
          <label
            className={`${prefix}--file-browse-btn`}
            htmlFor={id || uid}
            role={role || 'button'}
            tabIndex={tabIndex || 0}
            data-invalid={invalid || null}
            onKeyDown={evt => {
              if (matches(evt, [keys.ENTER, keys.SPACE])) {
                inputRef.current.click();
              }
            }}
            {...other}>
            {labelText}
          </label>
        </p>
        <input
          type="file"
          id={id || uid}
          className={`${prefix}--file-input`}
          ref={inputRef}
          tabIndex="-1"
          disabled={disabled}
          accept={accept}
          name={name}
          multiple={multiple}
          onChange={handleChange}
          onClick={evt => {
            evt.target.value = null;
          }}
        />
      </div>
      <div data-file-container className={`${prefix}--file-container`}>
        {props.children}
      </div>
    </div>
  );
}

FileUploaderDropContainer.propTypes = {
  /**
   * Provide a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Provide a unique id for the underlying <input> node
   */
  id: PropTypes.string,

  /**
   * Provide the label text to be read by screen readers when interacting with
   * this control
   */
  labelText: PropTypes.string,

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple: PropTypes.bool,

  /**
   * Provide a name for the underlying <input> node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the <input>
   * value changes
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional `onClick` hook that is called each time the button is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an accessibility role for the <FileUploaderButton>
   */
  role: PropTypes.string,

  /**
   * Provide a custom tabIndex value for the <FileUploaderButton>
   */
  tabIndex: PropTypes.number,

  /**
   * Specify the types of files that this input should be able to receive
   */
  accept: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify if any of the selected files is invalid
   */
  invalid: PropTypes.bool,
};

FileUploaderDropContainer.defaultProps = {
  tabIndex: 0,
  labelText: 'Add file',
  multiple: false,
  onAddFiles: () => {},
  onClick: () => {},
  accept: [],
};
