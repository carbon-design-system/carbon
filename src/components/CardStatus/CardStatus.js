import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const appStatus = {
  RUNNING: 0,
  NOT_RUNNING: 1,
  STOPPED: 2,
};

function createCardStatusContent(status, labels) {
  const cardStatusArray = ['running', 'not-running', 'stopped'];
  const statusText = cardStatusArray[status];
  if (statusText) {
    const cardStatusClassName = `bx--card-footer__app-status--${statusText} active`;
    const cardStatusTextClassName = `bx--${statusText}__text`;
    return (
      <div className={cardStatusClassName}>
        <div className={cardStatusTextClassName}>
          {
            labels[
              `${statusText.replace(/(-(\w))/g, (match, separator, letter) =>
                letter.toUpperCase()
              )}Text`
            ]
          }
        </div>
      </div>
    );
  }
  return '';
}

const CardStatus = ({
  className,
  status,
  runningText,
  notRunningText,
  stoppedText,
  ...other
}) => {
  const cardStatusClasses = classNames({
    'bx--card-footer__app-status': true,
    [className]: className,
  });
  const labels = {
    runningText,
    notRunningText,
    stoppedText,
  };

  return (
    <div className={cardStatusClasses} {...other}>
      {createCardStatusContent(status, labels)}
    </div>
  );
};

CardStatus.propTypes = {
  status: PropTypes.number,
  className: PropTypes.string,
  runningText: PropTypes.string,
  notRunningText: PropTypes.string,
  stoppedText: PropTypes.string,
};

CardStatus.defaultProps = {
  status: 0,
  runningText: 'Running',
  notRunningText: 'Not Running',
  stoppedText: 'Stopped',
};

CardStatus.appStatus = appStatus;

export default CardStatus;
