import React, { PropTypes, Component } from 'react';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const {
      children,
      ...other,
    } = this.props;

    return (
      <div {...other} className="bx--body">
        {children}
      </div>
    );
  }
}

export default AppContainer;
