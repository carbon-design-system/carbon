import React from 'react';
import PropTypes from 'prop-types';

export default class typeWeight extends React.Component {
  static propTypes = {
    type: PropTypes.string,
  };

  render() {
    const { type } = this.props;
    const typeWeight = require('../../content/guidelines/typography/_type-weight.md');
    const typeWeightItalic = require('../../content/guidelines/typography/_type-weight-italic.md');
    const typeTypes = require('../../content/guidelines/typography/_type-types.md');

    if (type === 'types') {
      return (
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-md-6 bx--offset-lg-4 type-weight">
            <div dangerouslySetInnerHTML={{ __html: typeTypes }} />
          </div>
        </div>
      );
    }

    if (type === 'italic') {
      return (
        <div className="bx--row">
          <div className="bx--col-lg-8 bx--col-md-6 bx--offset-lg-4 type-weight">
            <div dangerouslySetInnerHTML={{ __html: typeWeightItalic }} />
          </div>
        </div>
      );
    }

    return (
      <div className="bx--row">
        <div className="bx--col-lg-8 bx--col-md-6 bx--offset-lg-4 type-weight">
          <div dangerouslySetInnerHTML={{ __html: typeWeight }} />
        </div>
      </div>
    );
  }
}
