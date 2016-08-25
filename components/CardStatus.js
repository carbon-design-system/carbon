import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/card/card.scss';

class CardStatus extends React.Component {

  static propTypes = {
    status: React.PropTypes.number,
    className: React.PropTypes.string,
    statusTextArray: React.PropTypes.array,
  }

  static defaultProps = {
    status: 0,
    statusTextArray: ['Running', 'Not Running', 'Stopped'],
  }

  static appStatus = {
    RUNNING: 0,
    NOT_RUNNING: 1,
    STOPPED: 2,
  };

  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
    };
  }

  createCardStatusContent = (status) => {
    const cardStatusArray = ['running', 'not-running', 'stopped'];
    const statusText = cardStatusArray[status];
    if (statusText) {
      const cardStatusClassName = `bx--card-footer__app-status--${statusText} active`;
      const cardStatusTextClassName = `bx--${statusText}__text`;
      return (
        <div className={cardStatusClassName}>
          <div className={cardStatusTextClassName}>{this.props.statusTextArray[status]}</div>
        </div>
      );
    }
    return '';
  }

  render() {
    const {
      status,
    } = this.props;

    const cardStatusClasses = classNames({
      'bx--card-footer__app-status': true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className={cardStatusClasses}>
        {this.createCardStatusContent(status)}
      </div>
    );
  }
}

export default CardStatus;
