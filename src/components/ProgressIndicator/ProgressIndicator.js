import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

export const ProgressStep = ({ ...props }) => {
  const { label, description, className, current, complete } = props;

  const classes = classnames({
    'bx--progress-step': true,
    'bx--progress-step--current': current,
    'bx--progress-step--complete': complete,
    'bx--progress-step--incomplete': !complete && !current,
    [className]: className,
  });

  const currentSvg = current && (
    <g>
      <circle
        stroke="#3d70b2"
        strokeWidth="5"
        fill="transparent"
        cx="12"
        cy="12"
        r="12"
      />
      <circle fill="#3d70b2" cx="12" cy="12" r="6" />
    </g>
  );

  const completeSvg = complete && (
    <g>
      <circle cx="12" cy="12" r="12" />
      <polygon points="10.3 13.6 7.7 11 6.3 12.4 10.3 16.4 17.8 9 16.4 7.6" />
    </g>
  );

  const incompleteSvg = !complete && (
    <g>
      <circle cx="12" cy="12" r="12" />
    </g>
  );

  return (
    <li className={classes}>
      <svg>
        <title>{description}</title>
        {currentSvg || completeSvg || incompleteSvg}
      </svg>
      <p className="bx--progress-label">{label}</p>
      <span className="bx--progress-line" />
    </li>
  );
};

ProgressStep.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  current: PropTypes.bool,
  complete: PropTypes.bool,
  description: PropTypes.string,
};

ProgressStep.defaultProps = {
  label: 'Provide label',
};

export class ProgressIndicator extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    currentIndex: PropTypes.number,
  };

  static defaultProps = {
    currentIndex: 0,
  };

  state = {
    currentIndex: this.props.currentIndex,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      this.setState({ currentIndex: nextProps.currentIndex });
    }
  }

  renderSteps = () =>
    React.Children.map(this.props.children, (child, index) => {
      if (index === this.state.currentIndex) {
        return React.cloneElement(child, {
          current: true,
        });
      } else if (index < this.state.currentIndex) {
        return React.cloneElement(child, {
          complete: true,
        });
      } else if (index > this.state.currentIndex) {
        return React.cloneElement(child, {
          complete: false,
        });
      }
      return null;
    });

  render() {
    const { className, currentIndex, ...other } = this.props; // eslint-disable-line no-unused-vars
    const classes = classnames({
      'bx--progress': true,
      [className]: className,
    });
    return (
      <ul className={classes} {...other}>
        {this.renderSteps()}
      </ul>
    );
  }
}
