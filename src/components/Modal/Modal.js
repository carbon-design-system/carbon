import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Button from '../Button';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    passiveModal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    id: PropTypes.string,
    modalHeading: PropTypes.string,
    modalLabel: PropTypes.string,
    modalAriaLabel: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    open: PropTypes.bool,
    onRequestSubmit: PropTypes.func,
    onKeyDown: PropTypes.func,
    iconDescription: PropTypes.string,
    primaryButtonDisabled: PropTypes.bool,
    onSecondarySubmit: PropTypes.func,
    danger: PropTypes.bool,
    shouldSubmitOnEnter: PropTypes.bool,
  };

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
    primaryButtonDisabled: false,
    onKeyDown: () => {},
    passiveModal: false,
    iconDescription: 'close the modal',
    modalHeading: '',
    modalLabel: '',
  };

  button = React.createRef();

  handleKeyDown = evt => {
    if (evt.which === 27) {
      this.props.onRequestClose();
    }
    if (evt.which === 13 && this.props.shouldSubmitOnEnter) {
      this.props.onRequestSubmit();
    }
  };

  handleClick = evt => {
    if (this.innerModal && !this.innerModal.contains(evt.target)) {
      this.props.onRequestClose();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.beingOpen = true;
    } else if (prevProps.open && !this.props.open) {
      this.beingOpen = false;
    }
  }

  focusButton = () => {
    if (this.button) {
      this.button.current.focus();
    }
  };

  handleTransitionEnd = () => {
    if (
      this.outerModal.offsetWidth &&
      this.outerModal.offsetHeight &&
      this.beingOpen
    ) {
      this.focusButton();
      this.beingOpen = false;
    }
  };

  render() {
    const {
      modalHeading,
      modalLabel,
      modalAriaLabel,
      passiveModal,
      secondaryButtonText,
      primaryButtonText,
      open,
      onRequestClose,
      onRequestSubmit,
      onSecondarySubmit,
      iconDescription,
      primaryButtonDisabled,
      danger,
      ...other
    } = this.props;

    const onSecondaryButtonClick = onSecondarySubmit
      ? onSecondarySubmit
      : onRequestClose;

    const modalClasses = classNames({
      'bx--modal': true,
      'bx--modal-tall': !passiveModal,
      'is-visible': open,
      'bx--modal--danger': this.props.danger,
      [this.props.className]: this.props.className,
    });

    const modalButton = (
      <button
        className="bx--modal-close"
        type="button"
        onClick={onRequestClose}
        ref={this.button}>
        <Icon
          name="close"
          className="bx--modal-close__icon"
          description={iconDescription}
        />
      </button>
    );

    const modalBody = (
      <div
        ref={modal => {
          this.innerModal = modal;
        }}
        role="dialog"
        className="bx--modal-container"
        aria-label={modalAriaLabel}>
        <div className="bx--modal-header">
          {passiveModal && modalButton}
          {modalLabel && (
            <h4 className="bx--modal-header__label">{modalLabel}</h4>
          )}
          <h2 className="bx--modal-header__heading">{modalHeading}</h2>
          {!passiveModal && modalButton}
        </div>
        <div className="bx--modal-content">{this.props.children}</div>
        {!passiveModal && (
          <div className="bx--modal-footer">
            <div className="bx--modal__buttons-container">
              <Button
                kind={danger ? 'tertiary' : 'secondary'}
                onClick={onSecondaryButtonClick}>
                {secondaryButtonText}
              </Button>
              <Button
                kind={danger ? 'danger--primary' : 'primary'}
                disabled={primaryButtonDisabled}
                onClick={onRequestSubmit}
                inputref={this.button}>
                {primaryButtonText}
              </Button>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div
        {...other}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        className={modalClasses}
        role="presentation"
        tabIndex={-1}
        onTransitionEnd={this.props.open ? this.handleTransitionEnd : undefined}
        ref={outerModal => {
          this.outerModal = outerModal;
        }}>
        {modalBody}
      </div>
    );
  }
}
