import React from 'react';
import { Walktour } from 'walktour';
import TourTooltip from '../TourTooltip';
import PropTypes from 'prop-types';

export default class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      <Walktour
        {...this.props}
        customTooltipRenderer={logic => {
          const {
            title,
            description,
            disableClose,
            disableNext,
            disablePrev,
            nextLabel,
            prevLabel,
            closeLabel,
          } = logic.stepContent;

          const onClose = this.props.onClose
            ? () => {
                this.props.onClose(this.state.checked);
                logic.close();
              }
            : logic.close;

          return (
            <TourTooltip
              onChangeChecked={val => this.setState({ checked: val })}
              checked={this.state.checked}
              {...this.props}
              onNext={logic.next}
              onPrev={logic.prev}
              onClose={onClose}
              description={description}
              title={title}
              disableClose={disableClose}
              disableNext={disableNext}
              disablePrev={disablePrev}
              nextLabel={nextLabel}
              prevLabel={prevLabel}
              closeLabel={closeLabel}
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
      closeLabel: PropTypes.string,
      disableNext: PropTypes.bool,
      disablePrev: PropTypes.bool,
      disableClose: PropTypes.bool,
      customNextFunc: PropTypes.func,
      customPrevFunc: PropTypes.func,
      customCloseFunc: PropTypes.func,
    })
  ).isRequired,

  /** Optionally specify a custom close function for the entire tour. The checkbox state is passed as an argument to the callback
   *
   */
  onClose: PropTypes.func,

  /**
   * Optionally specify whether the tour should watch for changes to the target's size or position.
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
   * Optionally specify whether the "close" button should be hidden
   */
  hideClose: PropTypes.bool,
};
