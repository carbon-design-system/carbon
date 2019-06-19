import PropTypes from 'prop-types';
import React from 'react';
import ThemeVariable from './ThemeVariable';

/**
 * Category section of theme editor UI.
 */
const ThemeCategory = ({ tokens, updateColor }) => (
  <ul className="variables__list">
    {Object.keys(tokens).map(name => (
      <ThemeVariable
        key={name}
        updateColor={updateColor}
        name={name}
        hex={tokens[name]}
      />
    ))}
  </ul>
);

ThemeCategory.propTypes = {
  /**
   * The key-value map of token name/value.
   */
  tokens: PropTypes.object,

  /**
   * A callback function called when user changes the token value.
   */
  updateColor: PropTypes.func,
};

export default ThemeCategory;
