/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Filename from './Filename';
import FileUploaderButton from './FileUploaderButton';
import { ButtonKinds } from '../../prop-types/types';
import { keys, matches } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';

export default class FileUploader extends React.Component {
  static propTypes = {
    /**
     * Specify the types of files that this input should be able to receive
     */
    accept: PropTypes.arrayOf(PropTypes.string),

    /**
     * Specify the type of the <FileUploaderButton>
     */
    buttonKind: PropTypes.oneOf(ButtonKinds),

    /**
     * Provide the label text to be read by screen readers when interacting with
     * the <FileUploaderButton>
     */
    buttonLabel: PropTypes.string,

    /**
     * Provide a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify the status of the File Upload
     */
    filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading'])
      .isRequired,

    /**
     * Provide a description for the complete/close icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify the description text of this <FileUploader>
     */
    labelDescription: PropTypes.string,

    /**
     * Specify the title text of this <FileUploader>
     */
    labelTitle: PropTypes.string,

    /**
     * Specify if the component should accept multiple files to upload
     */
    multiple: PropTypes.bool,

    /**
     * Provide a name for the underlying `<input>` node
     */
    name: PropTypes.string,

    /**
     * Provide an optional `onChange` hook that is called each time the input is
     * changed
     */
    onChange: PropTypes.func,

    /**
     * Provide an optional `onClick` hook that is called each time the
     * FileUploader is clicked
     */
    onClick: PropTypes.func,

    /**
     * Provide an optional `onDelete` hook that is called when an uploaded item
     * is removed
     */
    onDelete: PropTypes.func,

    /**
     * Specify the size of the FileUploaderButton, from a list of available
     * sizes. For `default` buttons, this prop can remain unspecified.
     * V11: `default`, `field`, and `small` will be removed
     */
    size: PropTypes.oneOf(['default', 'field', 'small', 'sm', 'md', 'lg']),
  };

  static contextType = PrefixContext;

  static defaultProps = {
    iconDescription: 'Provide icon description',
    filenameStatus: 'uploading',
    buttonLabel: '',
    buttonKind: 'primary',
    multiple: false,
    onClick: () => {},
    accept: [],
  };

  state = {
    filenames: [],
  };

  nodes = [];

  static getDerivedStateFromProps({ filenameStatus }, state) {
    const { prevFilenameStatus } = state;
    return prevFilenameStatus === filenameStatus
      ? null
      : {
          filenameStatus,
          prevFilenameStatus: filenameStatus,
        };
  }

  handleChange = (evt) => {
    evt.stopPropagation();
    const filenames = Array.prototype.map.call(
      evt.target.files,
      (file) => file.name
    );
    this.setState({
      filenames: this.props.multiple
        ? this.state.filenames.concat(filenames)
        : filenames,
    });
    if (this.props.onChange) {
      this.props.onChange(evt);
    }
  };

  handleClick = (evt, { index, filenameStatus }) => {
    if (filenameStatus === 'edit') {
      evt.stopPropagation();
      const filteredArray = this.state.filenames.filter(
        (filename) => filename !== this.nodes[index].innerText.trim()
      );
      this.setState({ filenames: filteredArray });
      if (this.props.onDelete) {
        this.props.onDelete(evt);
      }
      this.props.onClick(evt);
    }
  };

  clearFiles = () => {
    // A clearFiles function that resets filenames and can be referenced using a ref by the parent.
    this.setState({ filenames: [] });
  };

  render() {
    const {
      iconDescription,
      buttonLabel,
      buttonKind,
      filenameStatus,
      labelDescription,
      labelTitle,
      className,
      multiple,
      accept,
      name,
      size,
      onDelete, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const prefix = this.context;

    const classes = classNames({
      [`${prefix}--form-item`]: true,
      [className]: className,
    });

    const selectedFileClasses = classNames(`${prefix}--file__selected-file`, {
      [`${prefix}--file__selected-file--md`]: size === 'field' || size === 'md',
      [`${prefix}--file__selected-file--sm`]: size === 'small' || size === 'sm',
    });

    return (
      <div className={classes} {...other}>
        <p className={`${prefix}--file--label`}>{labelTitle}</p>
        <p className={`${prefix}--label-description`}>{labelDescription}</p>
        <FileUploaderButton
          labelText={buttonLabel}
          multiple={multiple}
          buttonKind={buttonKind}
          onChange={this.handleChange}
          disableLabelChanges
          accept={accept}
          name={name}
          size={size}
        />
        <div className={`${prefix}--file-container`}>
          {this.state.filenames.length === 0
            ? null
            : this.state.filenames.map((name, index) => (
                <span
                  key={index}
                  className={selectedFileClasses}
                  ref={(node) => (this.nodes[index] = node)} // eslint-disable-line
                  {...other}>
                  <p className={`${prefix}--file-filename`}>{name}</p>
                  <span className={`${prefix}--file__state-container`}>
                    <Filename
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={(evt) => {
                        if (matches(evt, [keys.Enter, keys.Space])) {
                          this.handleClick(evt, { index, filenameStatus });
                        }
                      }}
                      onClick={(evt) =>
                        this.handleClick(evt, { index, filenameStatus })
                      }
                    />
                  </span>
                </span>
              ))}
        </div>
      </div>
    );
  }
}
