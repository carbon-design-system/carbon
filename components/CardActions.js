import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/card/card.scss';

class CardActions extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    restartApp: React.PropTypes.func,
  }

  render() {
    const {
      children,
    } = this.props;

    const cardActionClasses = classNames({
      'bx--card-footer__app-actions': true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className={cardActionClasses}>
        {children}
      </div>
    );
  }
}

export default CardActions;
