import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const StructuredListSkeleton = ({ rowCount, border }) => {
  const StructuredListSkeletonClasses = classNames({
    'bx--skeleton': true,
    'bx--structured-list': true,
    'bx--structured-list--border': border,
  });

  const rows = [];
  for (var i = 0; i < rowCount; i++) {
    rows.push(
      <div className="bx--structured-list-row" key={i}>
        <div className="bx--structured-list-td" />
        <div className="bx--structured-list-td" />
        <div className="bx--structured-list-td" />
      </div>
    );
  }

  return (
    <section className={StructuredListSkeletonClasses}>
      <div className="bx--structured-list-thead">
        <div className="bx--structured-list-row bx--structured-list-row--header-row">
          <div className="bx--structured-list-th">
            <span />
          </div>
          <div className="bx--structured-list-th">
            <span />
          </div>
          <div className="bx--structured-list-th">
            <span />
          </div>
        </div>
      </div>
      <div className="bx--structured-list-tbody">{rows}</div>
    </section>
  );
};

StructuredListSkeleton.propTypes = {
  /**
   * number of table rows
   */
  rowCount: PropTypes.number,
  border: PropTypes.bool,
};

StructuredListSkeleton.defaultProps = {
  rowCount: 5,
  border: false,
};

export default StructuredListSkeleton;
