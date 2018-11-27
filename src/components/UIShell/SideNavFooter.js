import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

// TODO: replace with @carbon/icons-react
const Close = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32">
    <path d="M17.414 16L24 9.414 22.586 8 16 14.586 9.414 8 8 9.414 14.586 16 8 22.586 9.414 24 16 17.414 22.586 24 24 22.586 17.414 16z" />
  </svg>
);

// TODO: replace with @carbon/icons-react
const ChevronRight = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32">
    <path d="M22 16L12 26l-1.414-1.414L19.172 16l-8.586-8.586L12 6l10 10z" />
  </svg>
);

/**
 * SideNavFooter is used for rendering the button at the bottom of the side
 * navigation that is a part of the UI Shell. It is responsible for handling the
 * user interaction to expand or collapse the side navigation.
 */
const SideNavFooter = ({
  assistiveText,
  className: customClassName,
  isExpanded,
  onToggle,
}) => {
  const className = cx(`${prefix}--side-nav__footer`, customClassName);
  return (
    <footer className={className}>
      <button
        className={`${prefix}--side-nav__toggle`}
        type="button"
        onClick={onToggle}
        title={assistiveText}>
        <div className={`${prefix}--side-nav__icon`}>
          {isExpanded ? <Close /> : <ChevronRight />}
        </div>
        <span className={`${prefix}--assistive-text`}>{assistiveText}</span>
      </button>
    </footer>
  );
};

SideNavFooter.propTypes = {
  /**
   * Provide text to be read to screen readers and shown as a tooltip when
   * interacting with the toggle button in the footer
   */
  assistiveText: PropTypes.string.isRequired,

  /**
   * Specify whether the side navigation is expanded or collapsed
   */
  isExpanded: PropTypes.bool.isRequired,

  /**
   * Provide a function that is called when the toggle button is interacted
   * with. Useful for controlling the expansion state of the side navigation.
   */
  onToggle: PropTypes.func.isRequired,
};

SideNavFooter.defaultProps = {
  assistiveText: 'Toggle opening or closing the side navigation',
};

export default SideNavFooter;
