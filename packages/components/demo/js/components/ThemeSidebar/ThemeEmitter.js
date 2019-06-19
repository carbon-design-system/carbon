import { paramCase } from 'change-case';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

/**
 * A component to emit theme content as `<style>`.
 */
const ThemeEmitter = ({ theme }) =>
  createPortal(
    <style>
      {`:root.demo--theme--custom .demo--container,
      :root.demo--theme--custom .component-example__live {
        ${Object.keys(theme)
          .map(
            key =>
              `--${paramCase(key).replace(/(\d+)$/, '-$1')}: ${theme[key]};`
          )
          .join('\n')}
      }`}
    </style>,
    document.head
  );

ThemeEmitter.propTypes = {
  /**
   * The theme data.
   */
  theme: PropTypes.object,
};

export default ThemeEmitter;
