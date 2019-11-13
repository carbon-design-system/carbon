import React from 'react';
import PropTypes from 'prop-types';

const SliderLabel = ({ children }) => (
  <span
    style={{
      paddingLeft: 5,
      paddingRight: 5,
      whiteSpace: 'nowrap',
    }}>
    {children}
  </span>
);

export default function Slider({
  name,
  hashMarks,
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
      }}>
      <SliderLabel>{values[min] || min}</SliderLabel>
      <input
        style={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '25rem',
          padding: '5px',
        }}
        type="range"
        name={name}
        list={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      {hashMarks && (
        <datalist id={name}>
          {values.map((value, i) => (
            <option key={`${value}${i}`} value={i}></option>
          ))}
        </datalist>
      )}
      <SliderLabel>
        {`${values[value] || value} / ${values[max] || max}`}
      </SliderLabel>
    </div>
  );
}
Slider.propTypes = {
  /**
   * String specifying the name for the slider
   */
  name: PropTypes.string.isRequired,

  /**
   * Boolean value for displaying hash marks along the slider
   */
  hashMarks: PropTypes.bool,

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
  name: 'Slider',
  min: 0,
  max: 10,
  step: 1,
  value: 5,
  onChange: value => value,
};
