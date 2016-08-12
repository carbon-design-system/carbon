import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/file-uploader/file-uploader.scss';

class FileUploader extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string,
    id: React.PropTypes.string,
    labelDescription: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
  }

  static defaultProps = {
    className: 'bx--file__label',
    tabIndex: 0,
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
  }

  handleBlur = (evt) => {
    this.props.onBlur(evt);
  }

  handleClick = (evt) => {
    this.props.onClick(evt);
  }

  handleFocus = (evt) => {
    this.props.onFocus(evt);
  }

  handleMouseEnter = (evt) => {
    this.props.onMouseEnter(evt);
  }

  handleMouseLeave = (evt) => {
    this.props.onMouseLeave(evt);
  }

  handleMouseDown = (evt) => {
    this.props.onMouseDown(evt);
  }

  handleMouseUp = (evt) => {
    this.props.onMouseUp(evt);
  }

  updateLabel = (evt) => {
    const element = evt.target;
    const labelSelector = element.dataset.label;
    const labelNode = document.querySelector(labelSelector);
    let fileName = '';

    if (element.files && element.files.length > 1) {
      fileName = (element.dataset.multipleCaption || '').replace('{count}', element.files.length);
    } else {
      fileName = element.value.split('\\').pop();
    }

    if (fileName) {
      labelNode.textContent = fileName;
    }
  }

  render() {
    const fileUploaderProps = {
      tabIndex: this.props.tabIndex,
      type: this.props.type || 'file',
      id: this.props.id,
      labelDescription: this.props.labelDescription,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onMouseEnter: this.handleMouseEnter,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onChange: this.updateLabel,
    };

    const fileUploaderClasses = classNames({
      'bx--file__label': true,
      [this.props.className]: this.props.className,
    });

    const fileUploader = (
      <div className="fileUploaderWrapper">
        <label
          data-file-appearance
          className={fileUploaderClasses}
          htmlFor={this.props.id}
        >{this.props.labelDescription}</label>
        <input
          data-file-uploader
          data-multiple-caption="{count} files selected"
          data-label="[data-file-appearance]"
          className="bx--file__input"
          {... fileUploaderProps}
          multiple
        />
      </div>
    );
    return fileUploader;
  }
}

export default FileUploader;
