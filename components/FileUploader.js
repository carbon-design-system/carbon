import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/file-uploader/file-uploader.scss';

class FileUploader extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    id: React.PropTypes.string.isRequired,
    labelDescription: React.PropTypes.string,
    multipleFilesText: React.PropTypes.func,
    buttonText: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    className: 'bx--file__label',
    tabIndex: 0,
    labelDescription: '',
    multipleFilesText: count => `${count} files selected`,
    buttonText: 'Choose Files',
    onChange: () => {},
  }

  state = {
    count: 0,
    text: this.props.labelDescription,
  }

  updateLabel = (evt) => {
    const element = evt.target;
    let fileName = '';

    if (element.files && element.files.length > 1) {
      fileName = this.props.multipleFilesText(element.files.length);
      this.setState({ count: element.files.length });
    } else {
      fileName = element.value.split('\\').pop();
      this.setState({ count: 1 });
    }

    if (fileName) {
      this.setState({ text: fileName });
    }
    this.props.onChange(evt);
  }

  render() {
    const fileUploaderProps = {
      tabIndex: this.props.tabIndex,
      type: 'file',
      id: this.props.id,
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
          data-button-title={this.props.buttonText}
          className={fileUploaderClasses}
          htmlFor={this.props.id}
        >{this.state.text}</label>
        <input
          data-file-uploader
          data-multiple-caption={this.props.multipleFilesText(this.state.count)}
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
