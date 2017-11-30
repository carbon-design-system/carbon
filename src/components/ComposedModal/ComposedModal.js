import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Icon from '../Icon';
import classNames from 'classnames';

export default class ComposedModal extends Component {
  static defaultProps = {
    onKeyDown: () => {},
  };

  static propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    onKeyDown: PropTypes.func,
  };

  state = {
    open: this.props.open,
  };

  handleKeyDown = evt => {
    if (evt.which === 27) {
      this.closeModal();
    }

    this.props.onKeyDown(evt);
  };

  componentDidMount() {
    if (this.modal) {
      this.modal.focus();
    }
  }

  componentWillReceiveProps({ open }) {
    if (open !== this.state.open) {
      this.setState({
        open,
      });
    }
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      className,
      open,
      containerClassName,
      children,
      ...other
    } = this.props;

    const modalClass = classNames({
      'bx--modal': true,
      'is-visible': open,
      [className]: className,
    });

    const containerClass = classNames({
      'bx--modal-container': true,
      [containerClassName]: containerClassName,
    });

    const childrenWithProps = React.Children.toArray(children).map(child => {
      if (child.type === ModalHeader || child.type === ModalFooter) {
        return React.cloneElement(child, {
          closeModal: this.closeModal,
        });
      }

      return child;
    });

    return (
      <div
        role="presentation"
        ref={modal => (this.modal = modal)}
        onKeyDown={this.handleKeyDown}
        className={modalClass}
        {...other}>
        <div className={containerClass}>{childrenWithProps}</div>
      </div>
    );
  }
}

export class ModalHeader extends Component {
  static defaultProps = {
    iconDescription: 'Close the modal',
    buttonOnClick: () => {},
  };

  static propTypes = {
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    titleClassName: PropTypes.string,
    closeClassName: PropTypes.string,
    closeIconClassName: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    iconDescription: PropTypes.string,
    closeModal: PropTypes.func,
    buttonOnClick: PropTypes.func,
  };

  handleCloseButtonClick = () => {
    this.props.closeModal();
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
      'bx--modal-header': true,
      [className]: className,
    });

    const labelClass = classNames({
      'bx--modal-header__label bx--type-delta': true,
      [labelClassName]: labelClassName,
    });

    const titleClass = classNames({
      'bx--modal-header__heading bx--type-beta': true,
      [titleClassName]: titleClassName,
    });

    const closeClass = classNames({
      'bx--modal-close': true,
      [closeClassName]: closeClassName,
    });

    const closeIconClass = classNames({
      'bx--modal-close__icon': true,
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
          type="button">
          <Icon
            name="close"
            className={closeIconClass}
            description={iconDescription}
          />
        </button>
      </div>
    );
  }
}

export class ModalBody extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className, children, ...other } = this.props;

    const contentClass = classNames({
      'bx--modal-content': true,
      [className]: className,
    });

    return (
      <div className={contentClass} {...other}>
        {children}
      </div>
    );
  }
}

export class ModalFooter extends Component {
  static propTypes = {
    className: PropTypes.string,
    primaryClassName: PropTypes.string,
    secondaryClassName: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    primaryButtonDisabled: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onRequestSubmit: PropTypes.func,
    closeModal: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
  };

  handleRequestClose = evt => {
    this.props.closeModal();
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
      ...other
    } = this.props;

    const footerClass = classNames({
      'bx--modal-footer': true,
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
            onClick={this.onRequestSubmit}
            className={primaryClass}
            disabled={primaryButtonDisabled}
            kind="primary">
            {primaryButtonText}
          </Button>
        )}

        {children}
      </div>
    );
  }
}
