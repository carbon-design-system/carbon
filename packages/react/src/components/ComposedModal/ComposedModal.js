/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { Close20 } from '@carbon/icons-react';
import toggleClass from '../../tools/toggleClass';
import requiredIfGivenPropExists from '../../prop-types/requiredIfGivenPropExists';

const { prefix } = settings;

export default class ComposedModal extends Component {
  state = {};

  static defaultProps = {
    onKeyDown: () => {},
    selectorPrimaryFocus: '[data-modal-primary-focus]',
  };

  outerModal = React.createRef();
  innerModal = React.createRef();
  button = React.createRef();

  static propTypes = {
    /**
     * Specify an optional className to be applied to the modal root node
     */
    className: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal node
     */
    containerClassName: PropTypes.string,

    /**
     * Specify an optional handler for closing modal.
     * Returning `false` here prevents closing modal.
     */
    onClose: PropTypes.func,

    /**
     * Specify an optional handler for the `onKeyDown` event. Called for all
     * `onKeyDown` events that do not close the modal
     */
    onKeyDown: PropTypes.func,

    /**
     * Specify whether the Modal is currently open
     */
    open: PropTypes.bool,

    /**
     * Specify a CSS selector that matches the DOM element that should be
     * focused when the Modal opens
     */
    selectorPrimaryFocus: PropTypes.string,

    /**
     * Specify the size variant.
     */
    size: PropTypes.oneOf(['xs', 'sm', 'lg']),
  };

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

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
    }
  };

  handleKeyDown = evt => {
    // Esc key
    if (evt.which === 27) {
      this.closeModal(evt);
    }

    this.props.onKeyDown(evt);
  };

  handleClick = evt => {
    if (
      this.innerModal.current &&
      !this.innerModal.current.contains(evt.target)
    ) {
      this.closeModal(evt);
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

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.open && this.state.open) {
      this.beingOpen = true;
    } else if (prevState.open && !this.state.open) {
      this.beingOpen = false;
    }
    toggleClass(
      document.body,
      `${prefix}--body--with-modal-open`,
      this.state.open
    );
  }

  focusButton = focusContainerElement => {
    const primaryFocusElement = focusContainerElement.querySelector(
      this.props.selectorPrimaryFocus
    );
    if (primaryFocusElement) {
      primaryFocusElement.focus();
      return;
    }
    if (this.button.current) {
      this.button.current.focus();
    }
  };

  componentWillUnmount() {
    toggleClass(document.body, `${prefix}--body--with-modal-open`, false);
  }

  componentDidMount() {
    toggleClass(
      document.body,
      `${prefix}--body--with-modal-open`,
      this.props.open
    );
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

  closeModal = evt => {
    const { onClose } = this.props;
    if (!onClose || onClose(evt) !== false) {
      this.setState({
        open: false,
      });
    }
  };

  render() {
    const { open } = this.state;
    const {
      className,
      containerClassName,
      children,
      danger,
      selectorPrimaryFocus, // eslint-disable-line
      size,
      ...other
    } = this.props;

    const modalClass = classNames({
      [`${prefix}--modal`]: true,
      'is-visible': open,
      [className]: className,
      [`${prefix}--modal--danger`]: danger,
    });

    const containerClass = classNames({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--${size}`]: size,
      [containerClassName]: containerClassName,
    });

    const childrenWithProps = React.Children.toArray(children).map(child => {
      switch (child.type) {
        case ModalHeader:
          return React.cloneElement(child, {
            closeModal: this.closeModal,
          });
        case ModalFooter:
          return React.cloneElement(child, {
            closeModal: this.closeModal,
            inputref: this.button,
          });
        default:
          return child;
      }
    });

    return (
      <div
        {...other}
        role="presentation"
        ref={this.outerModal}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onTransitionEnd={open ? this.handleTransitionEnd : undefined}
        className={modalClass}
        tabIndex={-1}>
        <div ref={this.innerModal} className={containerClass}>
          {childrenWithProps}
        </div>
      </div>
    );
  }
}

export class ModalHeader extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the modal header
     */
    className: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal header label
     */
    labelClassName: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal heading
     */
    titleClassName: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal close node
     */
    closeClassName: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal close icon node
     */
    closeIconClassName: PropTypes.string,

    /**
     * Specify an optional label to be displayed
     */
    label: PropTypes.node,

    /**
     * Specify an optional title to be displayed
     */
    title: PropTypes.node,

    /**
     * Specify the content to be placed in the ModalHeader
     */
    children: PropTypes.node,

    /**
     * Specify a description for the close icon that can be read by screen
     * readers
     */
    iconDescription: PropTypes.string,

    /**
     * Provide an optional function to be called when the modal is closed
     */
    closeModal: PropTypes.func,

    /**
     * Provide an optional function to be called when the close button is
     * clicked
     */
    buttonOnClick: PropTypes.func,
  };

  static defaultProps = {
    iconDescription: 'Close',
    buttonOnClick: () => {},
  };

  handleCloseButtonClick = evt => {
    this.props.closeModal(evt);
    this.props.buttonOnClick();
  };

  render() {
    const {
      className,
      labelClassName,
      titleClassName,
      closeClassName,
      closeIconClassName,
      label,
      title,
      children,
      iconDescription,
      closeModal, // eslint-disable-line
      buttonOnClick, // eslint-disable-line
      ...other
    } = this.props;

    const headerClass = classNames({
      [`${prefix}--modal-header`]: true,
      [className]: className,
    });

    const labelClass = classNames({
      [`${prefix}--modal-header__label ${prefix}--type-delta`]: true,
      [labelClassName]: labelClassName,
    });

    const titleClass = classNames({
      [`${prefix}--modal-header__heading ${prefix}--type-beta`]: true,
      [titleClassName]: titleClassName,
    });

    const closeClass = classNames({
      [`${prefix}--modal-close`]: true,
      [closeClassName]: closeClassName,
    });

    const closeIconClass = classNames({
      [`${prefix}--modal-close__icon`]: true,
      [closeIconClassName]: closeIconClassName,
    });

    return (
      <div className={headerClass} {...other}>
        {label && <p className={labelClass}>{label}</p>}

        {title && <p className={titleClass}>{title}</p>}

        {children}

        <button
          onClick={this.handleCloseButtonClick}
          className={closeClass}
          title={iconDescription}
          aria-label={iconDescription}
          type="button">
          <Close20 className={closeIconClass} />
        </button>
      </div>
    );
  }
}

export function ModalBody(props) {
  const { className, children, hasForm, hasScrollingContent, ...other } = props;
  const contentClass = classNames({
    [`${prefix}--modal-content`]: true,
    [`${prefix}--modal-content--with-form`]: hasForm,
    [className]: className,
  });
  const hasScrollingContentProps = hasScrollingContent
    ? {
        tabIndex: 0,
        role: 'region',
      }
    : {};
  return (
    <>
      <div className={contentClass} {...hasScrollingContentProps} {...other}>
        {children}
      </div>
      {hasScrollingContent && (
        <div className={`${prefix}--modal-content--overflow-indicator`} />
      )}
    </>
  );
}
ModalBody.propTypes = {
  /**
   * Specify an optional className to be added to the Modal Body node
   */
  className: PropTypes.string,

  /**
   * Provide whether the modal content has a form element.
   * If `true` is used here, non-form child content should have `bx--modal-content__regular-content` class.
   */
  hasForm: PropTypes.bool,

  /**
   * Specify whether the modal contains scrolling content
   */
  hasScrollingContent: PropTypes.bool,

  /**
   * Required props for the accessibility label of the header
   */
  ['aria-label']: requiredIfGivenPropExists(
    'hasScrollingContent',
    PropTypes.string
  ),
};

export class ModalFooter extends Component {
  static propTypes = {
    /**
     * Specify a custom className to be applied to the Modal Footer container
     */
    className: PropTypes.string,

    /**
     * Specify a custom className to be applied to the primary button
     */
    primaryClassName: PropTypes.string,

    /**
     * Specify the text for the primary button
     */
    primaryButtonText: PropTypes.string,

    /**
     * Specify whether the primary button should be disabled
     */
    primaryButtonDisabled: PropTypes.bool,

    /**
     * Specify a custom className to be applied to the secondary button
     */
    secondaryClassName: PropTypes.string,

    /**
     * Specify the text for the secondary button
     */
    secondaryButtonText: PropTypes.string,

    /**
     * Specify an optional function for when the modal is requesting to be
     * closed
     */
    onRequestClose: PropTypes.func,

    /**
     * Specify an optional function for when the modal is requesting to be
     * submitted
     */
    onRequestSubmit: PropTypes.func,

    /**
     * Specify an optional function that is called whenever the modal is closed
     */
    closeModal: PropTypes.func,

    /**
     * Pass in content that will be rendered in the Modal Footer
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
  };

  handleRequestClose = evt => {
    this.props.closeModal(evt);
    this.props.onRequestClose(evt);
  };

  render() {
    const {
      className,
      primaryClassName,
      secondaryClassName,
      secondaryButtonText,
      primaryButtonText,
      primaryButtonDisabled,
      closeModal, // eslint-disable-line
      onRequestClose, // eslint-disable-line
      onRequestSubmit, // eslint-disable-line
      children,
      danger,
      ...other
    } = this.props;

    const footerClass = classNames({
      [`${prefix}--modal-footer`]: true,
      [className]: className,
    });

    const primaryClass = classNames({
      [primaryClassName]: primaryClassName,
    });

    const secondaryClass = classNames({
      [secondaryClassName]: secondaryClassName,
    });

    return (
      <div className={footerClass} {...other}>
        {secondaryButtonText && (
          <Button
            className={secondaryClass}
            onClick={this.handleRequestClose}
            kind="secondary">
            {secondaryButtonText}
          </Button>
        )}

        {primaryButtonText && (
          <Button
            onClick={onRequestSubmit}
            className={primaryClass}
            disabled={primaryButtonDisabled}
            kind={danger ? 'danger' : 'primary'}
            ref={this.props.inputref}>
            {primaryButtonText}
          </Button>
        )}

        {children}
      </div>
    );
  }
}
