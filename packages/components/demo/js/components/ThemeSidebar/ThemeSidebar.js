import { camelCase, paramCase } from 'change-case';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Button, Dropdown, DropdownItem } from 'carbon-components-react';
import { Close20 } from '@carbon/icons-react';
import { themes } from '@carbon/themes';
import generateThemeContent from './generate-theme-content';
import ThemeCategory from './ThemeCategory';
import ThemeEmitter from './ThemeEmitter';

const deprecatedTokens = [
  'brand01',
  'brand02',
  'brand03',
  'active01',
  'hoverField',
];

const themeSwitcherItems = [
  {
    id: 'white',
    text: 'White',
  },
  {
    id: 'g10',
    text: 'Gray 10',
  },
  {
    id: 'g90',
    text: 'Gray 90',
  },
  {
    id: 'g100',
    text: 'Gray 100',
  },
];

/**
 * @param {object} theme A theme data.
 * @returns {object} A version of the given theme data excluding deprecated tokens.
 */
const excludeDeprecated = theme =>
  Object.keys(theme).reduce(
    (acc, key) =>
      deprecatedTokens.indexOf(key) >= 0 ? acc : { ...acc, [key]: theme[key] },
    {}
  );

/**
 * @param {object} theme A theme data.
 * @returns {object} The categorized version of the given theme data.
 */
const categorize = theme =>
  Object.keys(theme).reduce((acc, key) => {
    const token = paramCase(key).replace(/(\d+)$/, '-$1');
    const prefix = /^([^-]*).*?$/.exec(token)[1];
    acc[prefix] = acc[prefix] || {};
    acc[prefix][token] = theme[key];
    return acc;
  }, {});

export default class ThemeSidebar extends Component {
  static propTypes = {
    /**
     * `true` if this sidebar should be open.
     */
    open: PropTypes.bool,

    /**
     * A callback function called when user attempts to close this sidebar.
     */
    onClose: PropTypes.func,
  };

  state = {
    edited: false,
    themeId: themeSwitcherItems[0].id,
    theme: { ...themes[themeSwitcherItems[0].id] },
  };

  componentDidMount = () => {
    this.count = 0;
  };

  /**
   * Handles selection change in theme token's color picker.
   * @param {string} name The theme token name.
   * @param {string} hex The theme token variable.
   */
  updateColor = (name, hex) => {
    this.setState(
      ({ theme }) => ({
        edited: true,
        theme: {
          ...theme,
          [camelCase(name).replace(/_(\d)/, '$1')]: hex,
        },
      }),
      () => {
        themeSwitcherItems.forEach(item => {
          document.documentElement.classList.remove(`demo--theme--${item.id}`);
        });
        document.documentElement.classList.add('demo--theme--custom');
      }
    );
  };

  /**
   * Handles selection change in theme switcher dropdown.
   * @param {object} evt
   * @param {object} evt.value The id of the selected dropdown item.
   */
  handleThemeChange = ({ value } = {}) => {
    this.setState(
      ({ themeId: oldThemeId }) => {
        const themeId = value || oldThemeId;
        return {
          themeId,
          theme: { ...themes[themeId] },
          edited: false,
        };
      },
      () => {
        document.documentElement.classList.remove('demo--theme--custom');
        themeSwitcherItems.forEach(item => {
          document.documentElement.classList.toggle(
            `demo--theme--${item.id}`,
            item.id === this.state.themeId
          );
        });
      }
    );
  };

  handleCopyButtonClick = () => {
    const { theme } = this.state;
    const elem = document.createElement('textarea');
    elem.value = generateThemeContent(theme);
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  };

  render() {
    const { open, onClose } = this.props;
    const { themeId, theme, edited } = this.state;
    const categories = categorize(excludeDeprecated(theme));

    const className = classNames('sidebar', {
      'sidebar--open': open,
    });

    return (
      <div className={className}>
        <button className="sidebar__close-button" onClick={onClose}>
          <Close20 className="sidebar__close-icon" />
        </button>
        <div className={this.state.isSafari ? 'banner' : 'banner--hidden'} />
        <header>
          <h1 className="sidebar__title">
            Carbon <span>Themes</span>
          </h1>
          <Dropdown
            ariaLabel="dropdown for theme switcher"
            value={themeId}
            onChange={this.handleThemeChange}>
            {themeSwitcherItems.map(({ id, text }) => (
              <DropdownItem key={id} itemText={text} value={id} />
            ))}
          </Dropdown>
        </header>

        <div className="variables">
          <h5 className="variables__heading">
            COLOR VARIABLES
            <button
              className={
                this.state.edited
                  ? 'bx--link variables-reset'
                  : 'bx--link variables-reset variables-reset--hidden'
              }
              onClick={this.handleThemeChange}>
              Reset
            </button>
          </h5>
          <p className="variables__subtitle">
            Click on a swatch to change a{' '}
            <a
              href="http://carbondesignsystem.com/style/colors/usage"
              className="bx--link"
              target="_blank"
              rel="noopener noreferrer">
              color variable’s
            </a>{' '}
            value across the theme.
          </p>
          {Object.keys(categories).map(key => (
            <ThemeCategory
              key={key}
              tokens={categories[key]}
              updateColor={this.updateColor}
            />
          ))}
        </div>

        {edited && <ThemeEmitter theme={theme} />}

        <div className="export">
          <Button onClick={this.handleCopyButtonClick}>Copy theme SCSS</Button>
          <p className="export__subtitle">
            Click the button to copy theme content and paste it to a theme file
            at{' '}
            <a
              href="https://github.com/carbon-design-system/carbon/tree/master/packages/themes/src"
              className="bx--link"
              target="_blank"
              rel="noopener noreferrer">
              /path/to/carbon/packages/themes/src
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}
