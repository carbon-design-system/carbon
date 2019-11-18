import React from 'react';
import PropTypes from 'prop-types';
import { settings } from '@rocketsoftware/carbon-components';
import Checkbox from '../Checkbox';

const { prefix } = settings;

class TourTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      checked,
      onChangeChecked,
      title,
      description,
      nextLabel,
      prevLabel,
      closeLabel,
      onNext,
      onPrev,
      onClose,
      disableNext,
      disablePrev,
      disableClose,
      checkboxLabel,
      hideCheckbox,
      hideNext,
      hidePrev,
      hideClose,
    } = this.props;

    const next = disableNext ? undefined : onNext;
    const prev = disablePrev ? undefined : onPrev;
    const close = disableClose ? undefined : onClose;

    return (
      <>
        <div className={`${prefix}--tour-tooltip`}>
          {title && (
            <div className={`${prefix}--tour-tooltip__heading`}>{title}</div>
          )}
          <p>{description}</p>
          {!hideCheckbox && (
            <div className={`${prefix}--tour-tooltip__footer`}>
              <Checkbox
                id={`${prefix}--tour-tooltip--checkbox`}
                className={`${prefix}--tour-tooltip--checkbox`}
                checked={checked}
                onChange={onChangeChecked}
                labelText={checkboxLabel}
              />
            </div>
          )}
          {!(hideNext && hidePrev && hideClose) && (
            <div className={`${prefix}--tour-tooltip__action-group`}>
              {!hideClose && (
                <button
                  onClick={close}
                  className={`${prefix}--btn ${prefix}--btn--ghost ${prefix}--btn--sm`}>
                  {closeLabel}
                </button>
              )}
              {!hidePrev && (
                <button
                  onClick={prev}
                  disabled={disablePrev}
                  className={`${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--sm`}>
                  {prevLabel}
                </button>
              )}
              {!hideNext && (
                <button
                  onClick={next}
                  disabled={disableNext}
                  className={`${prefix}--btn ${prefix}--btn--primary ${prefix}--btn--sm`}>
                  {nextLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

TourTooltip.propTypes = {
  /**
   * Optional tooltip title
   */
  title: PropTypes.string,

  /**
   * Main tooltip content
   */
  description: PropTypes.string,

  /**
   * Value of the checkbox, if present
   */
  checked: PropTypes.bool,

  /**
   * Callback to fire when the value of the checkbox changes
   */
  onChangeChecked: PropTypes.func,

  /**
   * Optional display text for the "next" button
   */
  nextLabel: PropTypes.string,

  /**
   * Optional display text for the "previous" button
   */
  prevLabel: PropTypes.string,

  /**
   * Optional display text for the "close" button
   */
  closeLabel: PropTypes.string,

  /**
   * Optional display text for the checkbox label
   */
  checkboxLabel: PropTypes.string,

  /**
   * Optionally specify whether the "next"" button should be disabled
   */
  disableNext: PropTypes.bool,

  /**
   * Optionally specify whether the "previous" button should be disabled
   */
  disablePrev: PropTypes.bool,

  /**
   * Optionally specify whether the "close" button should be disabled
   */
  disableClose: PropTypes.bool,

  /**
   * Optionally specify whether the "next"" button should be hidden
   */
  hideNext: PropTypes.bool,

  /**
   * Optionally specify whether the "previous" button should be hidden
   */
  hidePrev: PropTypes.bool,

  /**
   * Optionally specify whether the "close" button should be hidden
   */
  hideClose: PropTypes.bool,

  /**
   * Function to be called when "next" is clicked
   */
  onNext: PropTypes.func,

  /**
   * Function to be called when "prev" is clicked
   */
  onPrev: PropTypes.func,

  /**
   * Function to be called when "close" is clicked
   */
  onClose: PropTypes.func,

  /**
   * Optionally hide the checkbox
   */
  hideCheckbox: PropTypes.bool,

  /**
   * Optionally provide the initial state of checkbox
   */
  initialCheckboxValue: PropTypes.bool,
};

TourTooltip.defaultProps = {
  nextLabel: 'Next',
  prevLabel: 'Previous',
  closeLabel: 'Skip Tour',
  checkboxLabel: "Don't show tour again.",
  hideNext: false,
  hidePrev: false,
  hideClose: false,
};

export default TourTooltip;
