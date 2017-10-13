import PropTypes from 'prop-types';
import React from 'react';
import Modal from './Modal';
import Button from './Button';

class ModalWrapper extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    handleOpen: PropTypes.func,
    children: PropTypes.node,
    id: PropTypes.string,
    buttonTriggerText: PropTypes.string,
    modalLabel: PropTypes.string,
    modalHeading: PropTypes.string,
    modalText: PropTypes.string,
    passiveModal: PropTypes.bool,
    withHeader: PropTypes.bool,
    modalBeforeContent: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
  };

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      id,
      buttonTriggerText,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      handleSubmit,
      ...other
    } = this.props;

    const props = {
      id,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      open: this.state.open,
      onRequestClose: this.handleClose,
      onRequestSubmit: handleSubmit,
    };

    return (
      <div
        onKeyDown={evt => {
          if (evt.which === 27) {
            this.handleClose();
            this.props.onKeyDown(evt);
          }
        }}>
        <Button onClick={this.handleOpen}>{buttonTriggerText}</Button>
        <Modal {...props} {...other}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalWrapper;
