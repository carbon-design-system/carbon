import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/global/global.scss';

export default class AppContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
      lightTheme: false,
    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState({
      lightTheme: !this.state.lightTheme,
    });
  }

  render() {
    const appContainerClasses = classNames({
      'bx--body': true,
      'bx--global-light-ui': this.state.lightTheme,
    });

    return (
      <div className={appContainerClasses}>
        {this.props.children}
      </div>
    );
  }
}
