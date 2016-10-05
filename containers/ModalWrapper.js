import React from 'react';
import Modal from '../components/Modal';
import PrimaryButton from '../elements/PrimaryButton';
import '@console/bluemix-components/consumables/scss/components/modals/modals.scss';

class ModalWrapper extends React.Component {

  static propTypes = {
    status: React.PropTypes.string,
    handleOpen: React.PropTypes.func,
    children: React.PropTypes.node,
    id: React.PropTypes.string,
    buttonTriggerText: React.PropTypes.string,
    modalLabel: React.PropTypes.string,
    modalHeading: React.PropTypes.string,
    modalText: React.PropTypes.string,
    passiveModal: React.PropTypes.bool,
    withHeader: React.PropTypes.bool,
    modalBeforeContent: React.PropTypes.bool,
    primaryButtonText: React.PropTypes.string,
    secondaryButtonText: React.PropTypes.string,
    modalProps: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
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
        <PrimaryButton onClick={this.handleOpen}>{buttonTriggerText}</PrimaryButton>
        <Modal {...modalProps} {...props}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalWrapper;
