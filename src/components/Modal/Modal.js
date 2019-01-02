import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { iconClose } from 'carbon-icons';
import Icon from '../Icon';
import Button from '../Button';
import { settings } from 'carbon-components';
// TODO: import { Close20 } from '@carbon/icons-react';
import Close20 from '@carbon/icons-react/lib/close/20';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;

const matchesFuncName =
  typeof Element !== 'undefined' &&
  ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(
    name => typeof Element.prototype[name] === 'function'
  )[0];

export default class Modal extends Component {
  static propTypes = {
    /**
     * Provide the contents of your Modal
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the modal root node
     */
    className: PropTypes.string,

    /**
     * Specify whether the modal should be button-less
     */
    passiveModal: PropTypes.bool,

    /**
     * Specify a handler for closing modal.
     * The handler should care of closing modal, e.g. changing `open` prop.
     */
    onRequestClose: PropTypes.func,

    /**
     * Specify the DOM element ID of the top-level node.
     */
    id: PropTypes.string,

    /**
     * Specify the content of the modal header title.
     */
    modalHeading: PropTypes.string,
    /**
     * Specify the content of the modal header label.
     */
    modalLabel: PropTypes.node,

    /**
     * Specify a label to be read by screen readers on the modal root node
     */
    modalAriaLabel: PropTypes.string,

    /**
     * Specify the text for the secondary button
     */
    secondaryButtonText: PropTypes.string,

    /**
     * Specify the text for the primary button
     */
    primaryButtonText: PropTypes.string,

    /**
     * Specify whether the Modal is currently open
     */
    open: PropTypes.bool,

    /**
     * Specify a handler for "submitting" modal.
     * The handler should care of closing modal, e.g. changing `open` prop, if necessary.
     */
    onRequestSubmit: PropTypes.func,

    onKeyDown: PropTypes.func,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify whether the Button should be disabled, or not
     */
    primaryButtonDisabled: PropTypes.bool,

    /**
     * Specify a handler for the secondary button.
     * Useful if separate handler from `onRequestClose` is desirable
     */
    onSecondarySubmit: PropTypes.func,

    /**
     * Specify whether the Modal is for dangerous actions
     */
    danger: PropTypes.bool,

    /**
     * Specify if Enter key should be used as "submit" action
     */
    shouldSubmitOnEnter: PropTypes.bool,

    /**
     * Specify CSS selectors that match DOM elements working as floating menus.
     * Focusing on those elements won't trigger "focus-wrap" behavior
     */
    selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),

    /**
     * Specify a CSS selector that matches the DOM element that should
     * be focused when the Modal opens
     */
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
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  };

  button = React.createRef();
  outerModal = React.createRef();
  innerModal = React.createRef();

  elementOrParentIsFloatingMenu = target => {
    const {
      selectorsFloatingMenus = [
        `.${prefix}--overflow-menu-options`,
        `.${prefix}--tooltip`,
        '.flatpickr-calendar',
      ],
    } = this.props;
    if (target && typeof target.closest === 'function') {
      return selectorsFloatingMenus.some(selector => target.closest(selector));
    } else {
      // Alternative if closest does not exist.
      while (target) {
        if (typeof target[matchesFuncName] === 'function') {
          if (
            selectorsFloatingMenus.some(selector =>
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
      this.props.onRequestClose(evt);
    }
    if (evt.which === 13 && this.props.shouldSubmitOnEnter) {
      this.props.onRequestSubmit(evt);
    }
  };

  handleClick = evt => {
    if (
      this.innerModal.current &&
      !this.innerModal.current.contains(evt.target) &&
      !this.elementOrParentIsFloatingMenu(evt.target)
    ) {
      this.props.onRequestClose(evt);
    }
  };

  focusModal = () => {
    if (this.outerModal.current) {
      this.outerModal.current.focus();
    }
  };

  handleBlur = evt => {
    // Keyboard trap
    if (
      this.innerModal.current &&
      this.props.open &&
      evt.relatedTarget &&
      !this.innerModal.current.contains(evt.relatedTarget) &&
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

  focusButton = focusContainerElement => {
    const primaryFocusElement = focusContainerElement.querySelector(
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

  componentDidMount() {
    if (!this.props.open) {
      return;
    }
    this.focusButton(this.innerModal.current);
  }

  handleTransitionEnd = evt => {
    if (
      this.outerModal.current.offsetWidth &&
      this.outerModal.current.offsetHeight &&
      this.beingOpen
    ) {
      this.focusButton(evt.currentTarget);
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
      [`${prefix}--modal`]: true,
      [`${prefix}--modal-tall`]: !passiveModal,
      'is-visible': open,
      [`${prefix}--modal--danger`]: this.props.danger,
      [this.props.className]: this.props.className,
    });

    const modalButton = (
      <button
        className={`${prefix}--modal-close`}
        type="button"
        onClick={onRequestClose}
        ref={this.button}>
        {componentsX ? (
          <Close20
            alt={iconDescription}
            aria-label={iconDescription}
            className={`${prefix}--modal-close__icon`}
          />
        ) : (
          <Icon
            icon={iconClose}
            className={`${prefix}--modal-close__icon`}
            description={iconDescription}
          />
        )}
      </button>
    );

    const modalBody = (
      <div
        ref={this.innerModal}
        role="dialog"
        className={`${prefix}--modal-container`}
        aria-label={modalAriaLabel}>
        <div className={`${prefix}--modal-header`}>
          {passiveModal && modalButton}
          {modalLabel && (
            <p className={`${prefix}--modal-header__label`}>{modalLabel}</p>
          )}
          <p className={`${prefix}--modal-header__heading`}>{modalHeading}</p>
          {!passiveModal && modalButton}
        </div>
        <div className={`${prefix}--modal-content`}>{this.props.children}</div>
        {!passiveModal && (
          <div className={`${prefix}--modal-footer`}>
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
        ref={this.outerModal}>
        {modalBody}
      </div>
    );
  }
}
