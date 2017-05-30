import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from './Button';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/modals/modals.scss');
}

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
    modalProps: PropTypes.object,
    handleSubmit: PropTypes.func,
  }

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
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const {
      id,
      buttonTriggerText,
      modalLabel,
      modalHeading,
      passiveModal,
      primaryButtonText,
      secondaryButtonText,
      modalProps,
      ...other,
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
      onRequestSubmit: this.props.handleSubmit,
      ref: 'modal',
    };

    return (
      <div>
        <Button onClick={this.handleOpen}>{buttonTriggerText}</Button>
        <Modal {...modalProps} {...props} {...other}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalWrapper;
