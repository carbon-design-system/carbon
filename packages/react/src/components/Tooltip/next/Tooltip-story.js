import React, { useState, useEffect } from 'react';
import { useId } from '../../../internal/useId';

function Tooltip({ children, label, description }) {
  // throw warning if there's more than one child
  const child = React.Children.only(children);
  const [visible, setVisible] = useState(false);
  const id = useId('tooltip');

  const triggerProps = {
    onFocus: () => setVisible(true),
    onBlur: () => setVisible(false),
  };

  if (label) {
    triggerProps['aria-labelledby'] = id;
  } else {
    triggerProps['aria-describedby'] = id;
  }

  useEffect(() => {
    function listener(event) {
      if (event.key === 'Escape') {
        return setVisible(false);
      }
    }
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      {React.cloneElement(child, triggerProps)}
      <span className="tooltip">
        <span
          hidden={!visible}
          id={id}
          role="tooltip"
          aria-hidden="true"
          className="tooltip-content">
          {label || description}
        </span>
      </span>
    </div>
  );
}

export const Description = () => {
  return (
    <Tooltip description="modify account settings">
      <button type="button">Edit</button>
    </Tooltip>
  );
};

export const Default = () => {
  return (
    <Tooltip label="close">
      <button type="button">X</button>
    </Tooltip>
  );
};

export default { title: 'Experimental/unstable_Tooltip' };
