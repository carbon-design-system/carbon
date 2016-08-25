import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/card/card.scss';

class CardFooter extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    status: React.PropTypes.string,
    className: React.PropTypes.string,
    restartApp: React.PropTypes.func,
  }

  static defaultProps = {
    status: 'running',
  }

  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
    };
  }

  render() {
    const {
      children,
    } = this.props;

    const cardFooterClasses = classNames({
      'bx--card__card-footer': true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className={cardFooterClasses}>
        {children}
      </div>
    );
  }
}

export default CardFooter;
