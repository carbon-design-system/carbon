import React, { PropTypes } from 'react';
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
  render() {
    const {
      story,
      style,
    } = this.props;
    return (
      <div>
        <AppContainer style={style}>
          {story()}
        </AppContainer>
      </div>
    );
  }
}

export default ThemeContainer;
