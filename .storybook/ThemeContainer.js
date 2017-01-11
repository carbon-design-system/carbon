import React, { PropTypes } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import AppContainer from '../components/AppContainer';
import './_theme-container.scss';

class ThemeContainer extends React.Component {
  static propTypes = {
    story: PropTypes.func.isRequired,
    style: PropTypes.object,
  }
  static defaultProps = {
    style: {
      padding: '3em',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }
  state = {
    theme: document.getElementsByTagName('body')[0].classList.contains('bx--global-light-ui') ? 'light' : 'dark',
  }
  handleThemeUpdate = (themeValue) => {
    this.setState({ theme: themeValue });
  }
  render() {
    const {
      story,
      style,
    } = this.props;
    return (
      <div>
        <AppContainer theme={this.state.theme} style={style}>
          {story()}
        </AppContainer>
        <ThemeSwitcher updateTheme={this.handleThemeUpdate} />
      </div>
    );
  }
}

export default ThemeContainer;
