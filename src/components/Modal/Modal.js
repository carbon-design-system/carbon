import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { iconClose } from 'carbon-icons';
import Icon from '../Icon';
import Button from '../Button';

const matchesFuncName =
  typeof Element !== 'undefined' &&
  ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(
    name => typeof Element.prototype[name] === 'function'
  )[0];

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
    selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),
    selectorPrimaryFocus: PropTypes.string,
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
    selectorsFloatingMenus: [
      '.bx--overflow-menu-options',
      '.bx--tooltip',
      '.flatpickr-calendar',
    ],
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  };

  button = React.createRef();

  elementOrParentIsFloatingMenu = target => {
    if (target && typeof target.closest === 'function') {
      return this.props.selectorsFloatingMenus.some(selector =>
        target.closest(selector)
      );
    } else {
      // Alternative if closest does not exist.
      while (target) {
        if (typeof target[matchesFuncName] === 'function') {
          if (
            this.props.selectorsFloatingMenus.some(selector =>
              target[matchesFuncName](selector)
            )
          ) {
            return true;
          }
        }
        target = target.parentNode;
      }
      return false;
    }
  };

  handleKeyDown = evt => {
    if (evt.which === 27) {
      this.props.onRequestClose();
    }
    if (evt.which === 13 && this.props.shouldSubmitOnEnter) {
      this.props.onRequestSubmit();
    }
  };

  handleClick = evt => {
    if (
      this.innerModal &&
      !this.innerModal.contains(evt.target) &&
      !this.elementOrParentIsFloatingMenu(evt.target)
    ) {
      this.props.onRequestClose();
    }
  };

  handleBlur = evt => {
    // Keyboard trap
    if (
      this.innerModal &&
      this.props.open &&
      (!evt.relatedTarget || !this.innerModal.contains(evt.relatedTarget)) &&
      !this.elementOrParentIsFloatingMenu(evt.relatedTarget)
    ) {
      this.focusModal();
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.beingOpen = true;
    } else if (prevProps.open && !this.props.open) {
      this.beingOpen = false;
    }
  }

  focusModal = () => {
    if (this.outerModal) {
      this.outerModal.focus();
    }
  };

  focusButton = evt => {
    const primaryFocusElement = evt.currentTarget.querySelector(
      this.props.selectorPrimaryFocus
    );
    if (primaryFocusElement) {
      primaryFocusElement.focus();
      return;
    }
    if (this.button) {
      this.button.current.focus();
    }
  };

  handleTransitionEnd = evt => {
    if (
      this.outerModal.offsetWidth &&
      this.outerModal.offsetHeight &&
      this.beingOpen
    ) {
      this.focusButton(evt);
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
      selectorPrimaryFocus, // eslint-disable-line
      selectorsFloatingMenus, // eslint-disable-line
      shouldSubmitOnEnter, // eslint-disable-line
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
          icon={iconClose}
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
        onBlur={this.handleBlur}
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
