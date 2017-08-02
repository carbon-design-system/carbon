/* eslint react/no-multi-comp: "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './Icon';
import uid from '../lib/uniqueId';

class FileUploaderButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    disableLabelChanges: PropTypes.bool,
    id: PropTypes.string,
    labelText: PropTypes.string,
    listFiles: PropTypes.bool,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    role: PropTypes.string
  };
  static defaultProps = {
    disableLabelChanges: false,
    labelText: 'Add file',
    multiple: false,
    onChange: () => {},
    role: 'button'
  };
  state = {
    labelText: this.props.labelText
  };
  componentWillMount() {
    this.uid = this.props.id || uid();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.labelText !== this.props.labelText) {
      this.setState({ labelText: nextProps.labelText });
    }
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
      ...other
    } = this.props;
    const classes = classNames({
      'bx--file': true,
      [className]: className
    });

    return (
      <div className={classes}>
        <label
          className="bx--btn bx--btn--primary"
          htmlFor={this.uid}
          role={role}
          {...other}
        >
          {this.state.labelText}
        </label>
        <input
          hidden
          id={this.uid}
          type="file"
          multiple={multiple}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class Filename extends Component {
  static propTypes = {
    style: PropTypes.object,
    status: PropTypes.oneOf(['edit', 'complete', 'uploading']),
    iconDescription: PropTypes.string
  };

  static defaultProps = {
    iconDescription: 'Provide icon description',
    status: 'uploading',
    style: {}
  };

  render() {
    const { status, style, iconDescription, ...other } = this.props;
    const tempStyle = Object.assign(style, { marginRight: '-1px' }); // temp style correction for loading component position
    return (
      <span>
        {status === 'uploading'
          ? <div className="bx--loading" style={tempStyle} {...other}>
              <svg className="bx--loading__svg" viewBox="-42 -42 84 84">
                <circle cx="0" cy="0" r="37.5" />
              </svg>
            </div>
          : null}
        {status === 'edit'
          ? <Icon
              className="bx--file-close"
              name="close--glyph"
              description={iconDescription}
              style={style}
              {...other}
            />
          : null}
        {status === 'complete'
          ? <Icon
              className="bx--file-complete"
              name="checkmark--glyph"
              description={iconDescription}
              style={style}
              {...other}
            />
          : null}
      </span>
    );
  }
}

class FileUploader extends Component {
  static propTypes = {
    iconDescription: PropTypes.string,
    buttonLabel: PropTypes.string,
    filenameStatus: PropTypes.oneOf(['edit', 'complete', 'uploading']).isRequired,
    labelDescription: PropTypes.string,
    labelTitle: PropTypes.string,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string
  };

  static defaultProps = {
    iconDescription: 'Provide icon description',
    filenameStatus: 'uploading',
    buttonLabel: 'Add file',
    multiple: false,
    onChange: () => {},
    onClick: () => {}
  };

  state = {
    filenames: [],
    filenameStatus: ''
  };

  nodes = [];

  componentWillReceiveProps(nextProps) {
    if (nextProps.filenameStatus !== this.props.filenameStatus) {
      this.setState({ filenameStatus: nextProps.filenameStatus });
    }
  }
  handleChange = evt => {
    this.setState({ filenames: [...evt.target.files].map(file => file.name) });
    this.props.onChange(evt);
  };

  handleClick = (evt, index) => {
    const filteredArray = this.state.filenames.filter(
      filename => filename !== this.nodes[index].innerText.trim()
    );
    this.setState({ filenames: filteredArray });
    this.props.onClick(evt);
  };

  render() {
    const {
      iconDescription,
      buttonLabel,
      filenameStatus,
      labelDescription,
      labelTitle,
      className,
      multiple,
      ...other
    } = this.props;

    const classes = classNames({
      'bx--form-item': true,
      [className]: className
    });

    return (
      <div className={classes} {...other}>
        <strong className="bx--label">{labelTitle}</strong>
        <p className="bx--label-description">{labelDescription}</p>
        <FileUploaderButton
          labelText={buttonLabel}
          multiple={multiple}
          onChange={this.handleChange}
          disableLabelChanges
        />
        <div className="bx--file-container">
          {this.state.filenames.length === 0
            ? null
            : this.state.filenames.map((name, index) =>
                <span
                  key={index}
                  className="bx--file__selected-file"
                  ref={node => (this.nodes[index] = node)} // eslint-disable-line
                  {...other}
                >
                  <p className="bx--file-filename">{name}</p>
                  <span className="bx--file__state-container">
                    <Filename
                      status={filenameStatus}
                      onClick={evt => this.handleClick(evt, index)}
                      iconDescription={iconDescription}
                    />
                  </span>
                </span>
              )}
        </div>
      </div>
    );
  }
}

export default FileUploader;
export { FileUploaderButton, Filename };
