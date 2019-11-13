import React from 'react';
import PropTypes from 'prop-types';

export default function Slider({
  name,
  min,
  max,
  step,
  value,
  values,
  onChange,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
      <span
        style={{
          paddingLeft: 5,
          paddingRight: 5,
          whiteSpace: 'nowrap',
        }}>
        {values[min] || min}
      </span>
      <input
        style={{
          flexGrow: 1,
          padding: '5px',
        }}
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <span>{`${values[value] || value} / ${values[max] || max}`}</span>
    </div>
  );
}
Slider.propTypes = {
  /**
   * String specifying the name for the slider
   */
  name: PropTypes.string,

  /**
   * Minimum possible value in the range
   */
  min: PropTypes.number.isRequired,

  /**
   * Maximum possible value in the range
   */
  max: PropTypes.number.isRequired,

  /**
   * Incremental values for the range slider
   */
  step: PropTypes.number.isRequired,

  /**
   * Current value of the range slider
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * For custom labels, highlighting non-numerical values, etc.
   *
   * The range input's `value` represents the index of a highlighted element in
   * the `values` array. This allows for the illusion of stepping through an
   * array of values, which the standard `step` attribute may not cover, since
   * `step` only accepts positive numbers or 'any' as a value
   */
  values: PropTypes.array,

  /**
   * The callback function for the `change` event,
   * called when range slider value changes.
   */
  onChange: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  min: 0,
  max: 10,
  step: 1,
  value: 5,
  onChange: value => value,
};
