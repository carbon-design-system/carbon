import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--sets.scss';


class ButtonContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }


  render() {

    const buttonContainerClasses = classNames({
      'bx--sets-of-buttons': true
    });

    return (
      <div className={buttonContainerClasses}>
        {this.props.children}
      </div>
    )
  }
}

export default ButtonContainer;
