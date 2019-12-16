import React from 'react';
import { Walktour } from 'walktour';
import TourTooltip from '../TourTooltip';
import PropTypes from 'prop-types';

export default class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
  }

  render() {
    const { flippedTitle, flippedDescription, enableFlip } = this.props;
    return (
      <Walktour
        {...this.props}
        customCloseFunc={logic => {
          if (this.props.onClose) {
            this.props.onClose(logic.stepIndex);
          }
          logic.close();
        }}
        customTooltipRenderer={logic => {
          const {
            title,
            description,
            disableNext,
            disablePrev,
            nextLabel,
            prevLabel,
          } = logic.stepContent;
          return (
            <TourTooltip
              {...(enableFlip && {
                enableFlip: true,
                flipped: this.state.flipped,
                onFlip: () => this.setState({ flipped: !this.state.flipped }),
              })}
              flippedTitle={flippedTitle}
              flippedDescription={flippedDescription}
              {...this.props}
              onNext={logic.next}
              onPrev={logic.prev}
              onClose={logic.close}
              description={description}
              title={title}
              disableNext={disableNext}
              disablePrev={disablePrev}
              nextLabel={nextLabel}
              prevLabel={prevLabel}
            />
          );
        }}
      />
    );
  }
}

Tour.propTypes = {
  /**
   * An array of steps that the tour should follow
   */
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      selector: PropTypes.string,
      description: PropTypes.string.isRequired,
      title: PropTypes.string,
      nextLabel: PropTypes.string,
      prevLabel: PropTypes.string,
      disableNext: PropTypes.bool,
      disablePrev: PropTypes.bool,
      customNextFunc: PropTypes.func,
      customPrevFunc: PropTypes.func,
      disableAutoScroll: PropTypes.bool,
      disableSmoothScroll: PropTypes.bool,
      movingTarget: PropTypes.bool,
      maskPadding: PropTypes.number,
      tooltipSeparation: PropTypes.number,
      /**
       * Optionally cause the tour to advance to the next step upon clicking the targeted element.
       * Only buttons are supported.
       */
      nextOnTargetClick: PropTypes.bool,
      /**
       * Validate before advancing the tour after clicking a button. Expects a promise resolving to a boolean.
       */
      validateNextOnTargetClick: PropTypes.func,
      orientationPreferences: PropTypes.oneOf([
        'east',
        'east-north',
        'east-south',
        'south',
        'south-east',
        'south-west',
        'west',
        'west-north',
        'west-south',
        'north',
        'north-east',
        'north-west',
      ]),
      /**
       * If specified, the tour will try to target and position with respect to an element that is outside
       * of its parent container. The tour is still bound to its container, so this should only be used
       * sparingly in situations where it cannot be avoided.
       */
      allowForeignTarget: PropTypes.bool,
    })
  ).isRequired,

  /** Optionally specify a custom close function for the entire tour. Passed the current step index as a param.
   */
  onClose: PropTypes.func,

  /**
   * Optionally specify the starting step. If conditionally rendering ({showTour && <Tour... />})
   * this can be used to resume from a particular step, even after unmounting.
   */
  initialStepIndex: PropTypes.number,

  /**
   * Optionally specify whether the tour should update upon changes to the target's size or position.
   */
  movingTarget: PropTypes.bool,

  /**
   * Optional identifier to differentiate between multiple tours on the same page.
   */
  identifier: PropTypes.string,

  /**
   * Optionally specify whether the mask should be disabled
   */
  disableMask: PropTypes.bool,

  /**
   * Optionally disable automatic scrolling
   */
  disableAutoScroll: PropTypes.bool,

  /**
   * Optionally disable smooth scrolling
   */
  disableSmoothScroll: PropTypes.bool,

  /**
   * Optionally disables closing the tour on mask click
   */
  disableCloseOnClick: PropTypes.bool,

  /**
   * Optionally provide a callback that handles receiving an update function. Can be used to listen
   * for events and recalculate the tour's position when those events fire. The callback will be
   * passed `update` as an argument.
   */
  setUpdateListener: PropTypes.func,

  /**
   * Optionally provide a callback intended to remove the listener set by `setUpdateListener`.
   * The callback will be passed `update` as an argument. Should only and always be used with `setUpdateListener`.
   */
  removeUpdateListener: PropTypes.func,

  /**
   * Optionally specify whether the tour is active or not. If specified, the tour will act as
   * a controlled component, and will defer to this prop when closing.
   */
  isOpen: PropTypes.bool,

  /**
   * Optionally specify whether the "next"" button should be hidden
   */
  hideNext: PropTypes.bool,

  /**
   * Optionally specify whether the "previous" button should be hidden
   */
  hidePrev: PropTypes.bool,

  /**
   * Optionally allow the tooltip to be flipped over, exposing secondary content on the back side.
   */
  enableFlip: PropTypes.bool,

  /**
   * Secondary Title, visible when the tooltip is flipped. Access flip functionality with "enableFlip"
   */
  flippedTitle: PropTypes.string,

  /**
   * Secondary body content, visible when the tooltip is flipped. Access flip functionality with "enableFlip"
   */
  flippedDescription: PropTypes.string,

  /**
   * Accessibility label text for the "close" button
   */
  closeButtonAriaLabel: PropTypes.string,

  /**
   * Accessibility label text for the "flip" button
   */
  flipButtonAriaLabel: PropTypes.string,

  /**
   * Optional selector to explicitly define where the tour components should be rendered in the DOM.
   * This impacts scrolling/scoping, and should only be used if absolutely necessary.
   */
  rootSelector: PropTypes.string,
};
