/**
 * Copyright IBM Corp. 2016, 2023
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
import { ReactAttr } from '../../types/common';

export interface FileUploaderProps extends ReactAttr<HTMLSpanElement> {
  /**
   * Specify the types of files that this input should be able to receive
   */
  accept?: string[];

  /**
   * Specify the type of the `<FileUploaderButton>`
   */
  buttonKind?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'danger--primary'
    | 'danger--ghost'
    | 'danger--tertiary'
    | 'tertiary';

  /**
   * Provide the label text to be read by screen readers when interacting with
   * the `<FileUploaderButton>`
   */
  buttonLabel?: string;

  /**
   * Provide a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether file input is disabled
   */
  disabled?: boolean;

  /**
   * Specify the status of the File Upload
   */
  filenameStatus: 'edit' | 'complete' | 'uploading';

  /**
   * Provide a description for the complete/close icon that can be read by screen readers
   */
  iconDescription: string;

  /**
   * Specify the description text of this `<FileUploader>`
   */
  labelDescription?: string;

  /**
   * Specify the title text of this `<FileUploader>`
   */
  labelTitle?: string;

  /**
   * Specify if the component should accept multiple files to upload
   */
  multiple?: boolean;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the input is
   * changed
   */
  onChange?: (event: any) => void;

  /**
   * Provide an optional `onClick` hook that is called each time the
   * FileUploader is clicked
   */
  onClick?: (event: any) => void;

  /**
   * Provide an optional `onDelete` hook that is called when an uploaded item
   * is removed
   */
  onDelete?: (event: any) => void;

  /**
   * Specify the size of the FileUploaderButton, from a list of available
   * sizes.
   */
  size?: 'sm' | 'small' | 'md' | 'field' | 'lg';
}

export default class FileUploader extends React.Component<
  FileUploaderProps,
  { filenames: string[] }
> {
  static propTypes = {
    /**
     * Specify the types of files that this input should be able to receive
     */
    accept: PropTypes.arrayOf(PropTypes.string),

    /**
     * Specify the type of the `<FileUploaderButton>`
     */
    buttonKind: PropTypes.oneOf(ButtonKinds),

    /**
     * Provide the label text to be read by screen readers when interacting with
     * the `<FileUploaderButton>`
     */
    buttonLabel: PropTypes.string,

    /**
     * Provide a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether file input is disabled
     */
    disabled: PropTypes.bool,

    /**
     * Specify the status of the File Upload
     */
    filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading'])
      .isRequired,

    /**
     * Provide a description for the complete/close icon that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * Specify the description text of this `<FileUploader>`
     */
    labelDescription: PropTypes.string,

    /**
     * Specify the title text of this `<FileUploader>`
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
     * sizes.
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  };

  static contextType = PrefixContext;

  static defaultProps = {
    disabled: false,
    filenameStatus: 'uploading',
    buttonLabel: '',
    buttonKind: 'primary',
    multiple: false,
    onClick: () => {},
    accept: [],
  };

  state = {
    filenames: [] as string[],
  };

  nodes: HTMLElement[] = [];

  uploaderButton = React.createRef<HTMLLabelElement>();

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
    ) as string[];
    this.setState({
      filenames: this.props.multiple
        ? [...new Set([...this.state.filenames, ...filenames])]
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
        this.uploaderButton.current?.focus?.();
      }
      this.props.onClick?.(evt);
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
      disabled,
      filenameStatus,
      labelDescription,
      labelTitle,
      className,
      multiple,
      accept,
      name,
      size = 'md',
      onDelete, // eslint-disable-line
      ...other
    } = this.props;

    const prefix = this.context;

    const classes = classNames({
      [`${prefix}--form-item`]: true,
      [className as string]: className,
    });

    const getHelperLabelClasses = (baseClass) =>
      classNames(baseClass, {
        [`${prefix}--label-description--disabled`]: disabled,
      });

    const selectedFileClasses = classNames(`${prefix}--file__selected-file`, {
      [`${prefix}--file__selected-file--md`]: size === 'field' || size === 'md',
      [`${prefix}--file__selected-file--sm`]: size === 'small' || size === 'sm',
    });

    return (
      <div className={classes} {...other}>
        {!labelTitle ? null : (
          <p className={getHelperLabelClasses(`${prefix}--file--label`)}>
            {labelTitle}
          </p>
        )}
        <p className={getHelperLabelClasses(`${prefix}--label-description`)}>
          {labelDescription}
        </p>
        <FileUploaderButton
          innerRef={this.uploaderButton}
          disabled={disabled}
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
                  ref={(node) => (this.nodes[index] = node as HTMLSpanElement)} // eslint-disable-line
                  {...other}>
                  <p className={`${prefix}--file-filename`} id={name}>
                    {name}
                  </p>
                  <span className={`${prefix}--file__state-container`}>
                    <Filename
                      name={name}
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={(evt) => {
                        if (
                          matches(evt as unknown as Event, [
                            keys.Enter,
                            keys.Space,
                          ])
                        ) {
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
