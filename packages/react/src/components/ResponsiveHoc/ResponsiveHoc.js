import { useState, useEffect } from 'react';
import { window } from 'window-or-global';
import PropTypes from 'prop-types';

function ResponsiveHoc({ children, maxDeviceWidth, minDeviceWidth }) {
  const [windowSize, setWindowSize] = useState(getSize());

  function getSize() {
    return { width: window ? window.outerWidth : 0 };
  }

  useEffect(() => {
    if (!window) {
      return false;
    }
    const handleResize = () => {
      setWindowSize(getSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width < maxDeviceWidth && windowSize.width > minDeviceWidth) {
    return children;
  }
  return null;
}

export default ResponsiveHoc;

ResponsiveHoc.propTypes = {
  /**
   * The component or element to display.
   */
  children: PropTypes.element.isRequired,
  /**
   * The maxinum width before displaying children.
   */
  maxDeviceWidth: PropTypes.number,
  /**
   * The mininum width before displaying children.
   */
  minDeviceWidth: PropTypes.number,
};

ResponsiveHoc.defaultProps = {
  maxDeviceWidth: 10000,
  minDeviceWidth: 0,
};
