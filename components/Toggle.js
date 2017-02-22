import React from 'react';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/toggle/toggle.scss');
}

const propTypes = {
  className: React.PropTypes.string,
  defaultToggled: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  id: React.PropTypes.string.isRequired,
  toggled: React.PropTypes.bool,
  labelA: React.PropTypes.string.isRequired,
  labelB: React.PropTypes.string.isRequired,
};

const defaultProps = {
  defaultToggled: false,
  labelA: 'Off',
  labelB: 'On',
  onToggle: () => {},
};

const Toggle = ({ className, defaultToggled, toggled, onToggle, id, labelA, labelB, ...other }) => {
  let input;
  const wrapperClasses = classNames(
    'toggleWrapper',
    [className]: className
  );

  const checkedProps = {};

  if (typeof toggled !== 'undefined') {
    checkedProps.checked = toggled;
  } else {
    checkedProps.defaultChecked = defaultToggled;
  }

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        {...checkedProps}
        type="checkbox"
        id={id}
        className="bx--toggle"
        onChange={evt => { onToggle(input.checked, id, evt); }}
        ref={el => { input = el; }}
      />

      <label className="bx--toggle__label" htmlFor={id}>
        <span className="bx--toggle__text--left">{labelA}</span>
        <span className="bx--toggle__appearance"></span>
        <span className="bx--toggle__text--right">{labelB}</span>
      </label>
    </div>
  );
};

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;

export default Toggle;
