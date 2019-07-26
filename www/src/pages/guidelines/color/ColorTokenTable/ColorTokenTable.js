import React from 'react';
import classnames from 'classnames';
import {
  ContentSwitcher,
  Switch,
  OverflowMenu,
  OverflowMenuItem,
} from 'carbon-components-react';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component';
import colorTokens from '../../data/guidelines/color-tokens';

export default class ColorTokenTable extends React.Component {
  static propTypes = {};

  state = {
    theme: 'white',
    sticky: false,
    mobile: false,
  };

  componentDidMount() {
    if (window.innerWidth < 500) {
      this.setState({
        mobile: true,
      });
    }
    this.addResizeListener();
    this.addScrollListener();
  }

  addScrollListener() {
    document.addEventListener('scroll', () => {
      let stickyPoint = this.state.mobile ? 400 : 398;
      if (window.scrollY >= stickyPoint) {
        this.setState({
          sticky: true,
        });
      } else if (window.scrollY < stickyPoint) {
        this.setState({
          sticky: false,
        });
      }
    });
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 500) {
        this.setState({
          mobile: true,
        });
      } else if (window.innerWidth > 500) {
        this.setState({
          mobile: false,
        });
      }
    });
  }

  switchTheme = theme => {
    this.setState({
      theme: theme.name,
    });
  };

  hexToRgb = hex => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  renderValue = (token, tokenInfo) => {
    const currentTheme = this.state.theme;
    const value = tokenInfo.value;
    let bgColor = value[currentTheme].hex;
    if (bgColor.substring(bgColor.length - 3, bgColor.length) === '50%') {
      let hex = bgColor.substring(0, bgColor.length - 6);
      bgColor = `rgba(${this.hexToRgb(hex).r}, ${this.hexToRgb(hex).g}, ${
        this.hexToRgb(hex).b
      }, 0.5)`;
    }
    return (
      <div className="color-token-value">
        <ul>
          <li>{value[currentTheme].name}</li>
          <li>—</li>
          <li>{value[currentTheme].hex}</li>
        </ul>
        <div>
          <div
            className="color-token-value__block"
            style={{
              backgroundColor: bgColor,
              border:
                value[currentTheme].hex === '#ffffff' && '1px solid #BEBEBE',
            }}
          />
          <OverflowMenu floatingMenu={false} flipped>
            <CopyToClipboard text={value[currentTheme].hex}>
              <OverflowMenuItem primaryFocus itemText="Copy hex" />
            </CopyToClipboard>
            <CopyToClipboard text={token}>
              <OverflowMenuItem itemText="Copy token" />
            </CopyToClipboard>
          </OverflowMenu>
        </div>
      </div>
    );
  };

  renderToken = (token, tokenInfo, key) => {
    const roles = tokenInfo.role.map((role, i) => {
      return (
        <li key={i}>
          {role}
          {i !== tokenInfo.role.length - 1 && ';'}
        </li>
      );
    });
    return (
      <tr key={key}>
        <td>
          <code>{token}</code>
        </td>
        <td>
          <ul>{roles}</ul>
        </td>
        <td>{this.renderValue(token, tokenInfo)}</td>
      </tr>
    );
  };

  render() {
    const themeSwitcherClasses = classnames(
      'color-token-table__theme-switcher',
      {
        'color-token-table__theme-switcher--sticky': this.state.sticky,
      }
    );
    const h3Classes = classnames('page-h3', {
      'page-h3--sticky': this.state.sticky,
    });
    return (
      <div className="bx--row color-token-table">
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
          <ContentSwitcher
            className={themeSwitcherClasses}
            onChange={this.switchTheme}>
            <Switch name="white" text={this.state.mobile ? 'Wte' : 'White'} />
            <Switch name="g10" text={this.state.mobile ? 'G10' : 'Gray 10'} />
            <Switch name="g90" text={this.state.mobile ? 'G90' : 'Gray 90'} />
            <Switch
              name="g100"
              text={this.state.mobile ? 'G100' : 'Gray 100'}
            />
          </ContentSwitcher>
        </div>
        <div className="bx--col-lg-7 bx--offset-lg-4">
          <h3 className={h3Classes}>Core color tokens</h3>
        </div>
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
          <table className="page-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Role</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(colorTokens['core-tokens']).map((token, i) => {
                return this.renderToken(
                  token,
                  colorTokens['core-tokens'][token],
                  i
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bx--col-lg-7 bx--offset-lg-4">
          <h3 className="page-h3">Interactive color tokens</h3>
        </div>
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
          <table className="page-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Role</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(colorTokens['interaction-tokens']).map(
                (token, i) => {
                  return this.renderToken(
                    token,
                    colorTokens['interaction-tokens'][token],
                    i
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
