import React, { PropTypes } from 'react';
import './_theme-switcher.scss';
import Icon from '../components/Icon';

const propTypes = {
  updateTheme: PropTypes.func,
};

const defaultProps = {
  updateTheme: (themeValue) => { console.log(themeValue); },  // eslint-disable-line no-console
};

const ThemeSwitcher = ({ updateTheme }) => {
  const handleClick = (e) => {
    if (e.currentTarget.classList.contains('theme-switcher-btns__btn--light')) {
      document.getElementsByTagName('body')[0].classList.add('bx--global-light-ui');
      updateTheme('light');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('bx--global-light-ui');
      updateTheme('dark');
    }
  };
  return (
    <div className="theme-switcher-btns" data-theme-switcher="">
      <button
        className="theme-switcher-btns__btn theme-switcher-btns__btn--light"
        onClick={handleClick}
      >
        <Icon name="light--glyph" description="light theme icon" />
      </button>
      <button
        className="theme-switcher-btns__btn theme-switcher-btns__btn--dark"
        onClick={handleClick}
      >
        <Icon name="asleep--glyph" description="dark theme icon" />
      </button>
    </div>
  );
};

ThemeSwitcher.propTypes = propTypes;
ThemeSwitcher.defaultProps = defaultProps;

export default ThemeSwitcher;
