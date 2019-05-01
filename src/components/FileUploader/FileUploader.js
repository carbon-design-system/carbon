/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint react/no-multi-comp: "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import uid from '../../tools/uniqueId';
import { ButtonTypes } from '../../prop-types/types';
import CloseFilled16 from '@carbon/icons-react/lib/close--filled/16';
import CheckmarkFilled16 from '@carbon/icons-react/lib/checkmark--filled/16';

const { prefix } = settings;

export class FileUploaderButton extends Component {
  state = {};

  static propTypes = {
    /**
     * Provide a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether you want to disable any updates to the FileUploaderButton
     * label
     */
    disableLabelChanges: PropTypes.bool,

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
     * Specify whether you want the component to list the files that have been
     * submitted to be uploaded
     */
    listFiles: PropTypes.bool,

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
     * Specify the type of underlying button
     */
    buttonKind: ButtonTypes.buttonKind,

    /**
     * Specify the types of files that this input should be able to receive
     */
    accept: PropTypes.arrayOf(PropTypes.string),

    /**
     * Specify whether file input is disabled
     */
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    tabIndex: 0,
    disableLabelChanges: false,
    labelText: 'Add file',
    buttonKind: 'primary',
    multiple: false,
    onChange: () => {},
    onClick: () => {},
    accept: [],
    disabled: false,
  };

  static getDerivedStateFromProps({ labelText }, state) {
    const { prevLabelText } = state;
    return prevLabelText === labelText
      ? null
      : {
          labelText,
          prevLabelText: labelText,
        };
  }

  handleChange = evt => {
    const files = evt.target.files;
    const length = evt.target.files.length;
    if (files && !this.props.disableLabelChanges) {
      if (length > 1) {
        this.setState({ labelText: `${length} files` });
      } else if (length === 1) {
        this.setState({ labelText: files[0].name });
      }
    }
    this.props.onChange(evt);
  };

  render() {
    const {
      className,
      disableLabelChanges, // eslint-disable-line
      labelText, // eslint-disable-line
      multiple,
      role,
      tabIndex,
      buttonKind,
      accept,
      name,
      disabled,
      ...other
    } = this.props;
    const classes = classNames(
      `${prefix}--btn`,
      `${prefix}--btn--sm`,
      className,
      {
        [`${prefix}--btn--${buttonKind}`]: buttonKind,
      }
    );

    this.uid = this.props.id || uid();

    return (
      <>
        <label
          role="button"
          tabIndex={tabIndex || 0}
          className={classes}
          onKeyDown={evt => {
            if (evt.which === 13 || evt.which === 32) {
              this.input.click();
            }
          }}
          htmlFor={this.uid}
          role={role}
          {...other}>
          {this.state.labelText}
        </label>
        <input
          className={`${prefix}--visually-hidden`}
          ref={input => (this.input = input)}
          id={this.uid}
          disabled={disabled}
          type="file"
          tabIndex="-1"
          multiple={multiple}
          accept={accept}
          name={name}
          onChange={this.handleChange}
          onClick={evt => {
            evt.target.value = null;
          }}
        />
      </>
    );
  }
}

export class Filename extends Component {
  static propTypes = {
    /**
     * Specify an optional object of styles to be applied inline to the root
     * node
     */
    style: PropTypes.object,

    /**
     * Specify the status of the File Upload
     */
    status: PropTypes.oneOf(['edit', 'complete', 'uploading']),

    /**
     * Provide a description for the complete/close icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    onKeyDown: () => {},
    status: 'uploading',
    style: {},
    tabIndex: 0,
  };

  render() {
    const { iconDescription, status, style, ...other } = this.props;

    if (status === 'uploading') {
      return (
        <div
          className={`${prefix}--loading`}
          style={{ ...style, width: '1rem', height: '1rem' }}
          {...other}>
          <svg className={`${prefix}--loading__svg`} viewBox="-42 -42 84 84">
            <circle cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      );
    } else if (status === 'edit') {
      return (
        <CloseFilled16
          className={`${prefix}--file-close`}
          aria-label={iconDescription}
          style={style}
          {...other}>
          {iconDescription && <title>{iconDescription}</title>}
        </CloseFilled16>
      );
    } else if (status === 'complete') {
      return (
        <CheckmarkFilled16
          className={`${prefix}--file-complete`}
          aria-label={iconDescription}
          style={style}
          {...other}>
          {iconDescription && <title>{iconDescription}</title>}
        </CheckmarkFilled16>
      );
    } else {
      return null;
    }
  }
}

export default class FileUploader extends Component {
  static propTypes = {
    /**
     * Provide a description for the complete/close icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Provide the label text to be read by screen readers when interacting with
     * the <FileUploaderButton>
     */
    buttonLabel: PropTypes.string,

    /**
     * Specify the type of the <FileUploaderButton>
     */
    buttonKind: ButtonTypes.buttonKind,

    /**
     * Specify the status of the File Upload
     */
    filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading'])
      .isRequired,

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
     * Provide a name for the underlying <input> node
     */
    name: PropTypes.string,

    /**
     * Provide an optional `onClick` hook that is called each time the button is
     * clicked
     */
    onClick: PropTypes.func,

    /**
     * Provide a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify the types of files that this input should be able to receive
     */
    accept: PropTypes.arrayOf(PropTypes.string),
  };

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

  handleChange = evt => {
    evt.stopPropagation();
    this.setState({
      filenames: this.state.filenames.concat(
        Array.prototype.map.call(evt.target.files, file => file.name)
      ),
    });
    this.props.onChange(evt);
  };

  handleClick = (evt, index) => {
    const filteredArray = this.state.filenames.filter(
      filename => filename !== this.nodes[index].innerText.trim()
    );
    this.setState({ filenames: filteredArray });
    this.props.onClick(evt);
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
      ...other
    } = this.props;

    const classes = classNames({
      [`${prefix}--form-item`]: true,
      [className]: className,
    });

    return (
      <div className={classes} {...other}>
        <strong className={`${prefix}--file--label`}>{labelTitle}</strong>
        <p className={`${prefix}--label-description`}>{labelDescription}</p>
        <FileUploaderButton
          labelText={buttonLabel}
          multiple={multiple}
          buttonKind={buttonKind}
          onChange={this.handleChange}
          disableLabelChanges
          accept={accept}
          name={name}
        />
        <div className={`${prefix}--file-container`}>
          {this.state.filenames.length === 0
            ? null
            : this.state.filenames.map((name, index) => (
                <span
                  key={index}
                  className={`${prefix}--file__selected-file`}
                  ref={node => (this.nodes[index] = node)} // eslint-disable-line
                  {...other}>
                  <p className={`${prefix}--file-filename`}>{name}</p>
                  <span className={`${prefix}--file__state-container`}>
                    <Filename
                      iconDescription={iconDescription}
                      status={filenameStatus}
                      onKeyDown={evt => {
                        if (evt.which === 13 || evt.which === 32) {
                          this.handleClick(evt, index);
                        }
                      }}
                      onClick={evt => {
                        if (filenameStatus === 'edit') {
                          this.handleClick(evt, index);
                        }
                      }}
                    />
                  </span>
                </span>
              ))}
        </div>
      </div>
    );
  }
}
