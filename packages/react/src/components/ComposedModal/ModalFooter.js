import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

function SecondaryButtonSet({
  secondaryButtons,
  secondaryButtonText,
  secondaryClassName,
  closeModal,
  onRequestClose,
}) {
  function handleRequestClose(evt) {
    closeModal(evt);
    onRequestClose(evt);
  }

  if (Array.isArray(secondaryButtons) && secondaryButtons.length <= 2) {
    return secondaryButtons.map(({ buttonText, onClick: onButtonClick }, i) => (
      <Button
        key={`${buttonText}-${i}`}
        className={secondaryClassName}
        kind="secondary"
        onClick={onButtonClick || handleRequestClose}>
        {buttonText}
      </Button>
    ));
  }
  if (secondaryButtonText) {
    return (
      <Button
        className={secondaryClassName}
        onClick={handleRequestClose}
        kind="secondary">
        {secondaryButtonText}
      </Button>
    );
  }
  return null;
}

SecondaryButtonSet.propTypes = {
  closeModal: PropTypes.func,
  onRequestClose: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },
  secondaryClassName: PropTypes.string,
};

export const ModalFooter = React.forwardRef(function ModalFooter(
  {
    children,
    className: customClassName,
    closeModal,
    danger,
    inputref,
    onRequestClose,
    onRequestSubmit,
    primaryButtonDisabled,
    primaryButtonText,
    primaryClassName,
    secondaryButtonText,
    secondaryButtons,
    secondaryClassName,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const footerClass = cx({
    [`${prefix}--modal-footer`]: true,
    [customClassName]: customClassName,
    [`${prefix}--modal-footer--three-button`]:
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2,
  });

  const secondaryButtonProps = {
    closeModal,
    secondaryButtons,
    secondaryButtonText,
    secondaryClassName,
    onRequestClose,
  };

  return (
    <ButtonSet className={footerClass} {...rest} ref={ref}>
      <SecondaryButtonSet {...secondaryButtonProps} />
      {primaryButtonText && (
        <Button
          onClick={onRequestSubmit}
          className={primaryClassName}
          disabled={primaryButtonDisabled}
          kind={danger ? 'danger' : 'primary'}
          ref={inputref}>
          {primaryButtonText}
        </Button>
      )}

      {children}
    </ButtonSet>
  );
});

ModalFooter.propTypes = {
  /**
   * Pass in content that will be rendered in the Modal Footer
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the Modal Footer container
   */
  className: PropTypes.string,

  /**
   * Specify an optional function that is called whenever the modal is closed
   */
  closeModal: PropTypes.func,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * The `ref` callback for the primary button.
   */
  inputref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

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
   * Specify whether the primary button should be disabled
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,

  /**
   * Specify a custom className to be applied to the primary button
   */
  primaryClassName: PropTypes.string,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,

  /**
   * Specify an array of config objects for secondary buttons
   * (`Array<{
   *   buttonText: string,
   *   onClick: function,
   * }>`).
   */
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },

  /**
   * Specify a custom className to be applied to the secondary button
   */
  secondaryClassName: PropTypes.string,
};

ModalFooter.defaultProps = {
  onRequestClose: () => {},
  onRequestSubmit: () => {},
  closeModal: () => {},
};
