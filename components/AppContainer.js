import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/global/global.scss';

class AppContainer extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['dark', 'light']).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
  }

  static defaultProps = {
    theme: 'dark',
  }

  state = {
    theme: this.props.theme,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.setState({ theme: nextProps.theme });
    }
  }

  render() {
    const {
      children,
      theme, // eslint-disable-line
      className,
      ...other,
    } = this.props;

    const classes = classNames(
      'bx--body',
      className,
      { 'bx--global-light-ui': this.state.theme === 'light' },
    );

    return (
      <div {...other} className={classes}>
        {children}
      </div>
    );
  }
}

export default AppContainer;
