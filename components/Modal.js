import React from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/modals/modals.scss';

class Modal extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    passiveModal: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    id: React.PropTypes.string,
    modalHeading: React.PropTypes.string,
    modalLabel: React.PropTypes.string,
    secondaryButtonText: React.PropTypes.string,
    primaryButtonText: React.PropTypes.string,
    open: React.PropTypes.bool,
    onRequestSubmit: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
  }

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    passiveModal: false,
  };

  handleKeyDown = (evt) => {
    if (evt.which === 27) {
      this.props.onRequestClose();
    }
  };

  handleClick = (evt) => {
    const innerModal = this.refs.modalInner;
    const isTarget = innerModal.contains(evt.target);
    if (!isTarget) {
      this.props.onRequestClose();
    }
  }

  render() {
    const {
      modalHeading,
      modalLabel,
      passiveModal,
      secondaryButtonText,
      primaryButtonText,
      open,
      onRequestClose,
      onRequestSubmit,
      ...other,
    } = this.props;

    const modalClasses = classNames({
      'bx--modal': true,
      'bx--modal-tall': !passiveModal,
      'is-visible': open,
      [this.props.className]: this.props.className,
    });

    const modalLabelContent = (modalLabel)
      ? <h4 className="bx--modal-content__label">{modalLabel}</h4>
      : '';

    const modalBody = (passiveModal)
      ? (
      <div ref="modalInner" className="bx--modal-inner">
        <div className="bx--modal-content">
          <div className="bx--modal__header">
            <button className="bx--modal__close" type="button" onClick={onRequestClose}>
              <Icon name="close" className="bx--modal__close--icon" />
            </button>
            {modalLabelContent}
            <h2 className="bx--modal-content__heading">{modalHeading}</h2>
          </div>
          {this.props.children}
        </div>
      </div>)
      : (
      <div ref="modalInner" className="bx--modal-inner">
        {modalLabelContent}
        <h2 className="bx--modal-content__heading">{modalHeading}</h2>
        <button className="bx--modal__close" type="button" onClick={onRequestClose}>
          <Icon name="close" className="bx--modal__close--icon" />
        </button>
        <div className="bx--modal-content">
          {this.props.children}
        </div>
        <div className="bx--modal__buttons">
          <div className="bx--modal__buttons-container">
            <button className="bx--btn--secondary" type="button" onClick={onRequestClose}>{secondaryButtonText}</button>
            <button className="bx--btn" onClick={onRequestSubmit}>{primaryButtonText}</button>
          </div>
        </div>
      </div>);

    const modal = (
      <div
        {...other}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        className={modalClasses}
        tabIndex={-1}
      >
        {modalBody}
      </div>
    );

    return modal;
  }
}

export default Modal;
