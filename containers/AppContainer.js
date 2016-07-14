import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/global/global.scss';


export default class AppContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      lightTheme: false
    }
  }

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  setLightTheme() {
    this.setState({ lightTheme: true })
  }

  setDarkTheme() {
    this.setState({ lightTheme: false })
  }

  render() {

    const appContainerClasses = classNames({
      'bx--body': true,
      'bx--global-light-ui': this.state.lightTheme
    });

    return (
      <div className={appContainerClasses}>
        {this.props.children}
      </div>
    )
  }
}
