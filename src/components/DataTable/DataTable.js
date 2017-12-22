import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Search from '../Search';

const toggleSortDirection = direction => {
  if (direction === 'DESC') {
    return 'ASC';
  }

  return 'DESC';
};

const sortRow = (key, direction) => (a, b) => {
  if (direction === 'DESC') {
    return a[key].localeCompare(b[key]);
  }

  return b[key].localeCompare(a[key]);
};

export class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.initialRows,
      sortKey: null,
      sortDirection: null,
    };
    this.sortBy = this.sortBy.bind(this);
    this.getHeaderProps = this.getHeaderProps.bind(this);
  }

  sortBy(key) {
    return () => {
      const direction =
        this.state.sortKey === key
          ? toggleSortDirection(this.state.sortDirection)
          : 'DESC';

      this.setState(state => {
        return {
          rows: state.rows.sort(sortRow(key, direction)),
          sortKey: key,
          sortDirection: direction,
        };
      });
    };
  }

  getHeaderProps(header) {
    return {
      onClick: this.sortBy(header.key),
      onKeyDown: () => {},
    };
  }

  render() {
    const { render, children, headers } = this.props;
    const { rows } = this.state;

    const renderProps = {
      rows,
      headers,
      sortBy: this.sortBy,
      getHeaderProps: this.getHeaderProps,
    };

    if (render !== undefined) {
      return render(renderProps);
    }

    if (children !== undefined) {
      return children(renderProps);
    }

    return null;
  }
}

export class DataTableColumnHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: false,
      active: false,
    };
  }

  setActive = () => {
    this.setState({
      active: true,
    });
  };

  removeActive = () => {
    this.setState({
      active: false,
    });
  };

  handleClick = () => {
    this.setState(state => ({
      sorted: !state.sorted,
    }));
  };

  render() {
    const { children, className, sortable, ...other } = this.props;
    const tableSortClasses = classNames('bx--table-sort-v2', {
      'bx--table-sort-v2--active': this.state.active,
      'bx--table-sort-v2--ascending': this.state.sorted,
    });
    return (
      <th {...other} className={className}>
        {sortable ? (
          <button
            onFocus={this.setActive}
            onClick={this.handleClick}
            className={tableSortClasses}>
            {children}
            <Icon
              className="bx--table-sort-v2__icon"
              name="caret--down"
              description="Sort arrow"
            />
          </button>
        ) : (
          children
        )}
      </th>
    );
  }
}

DataTableColumnHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  sortable: PropTypes.bool,
  onClick: PropTypes.func,
};

export const DataTableHead = ({ ...props }) => {
  const { children, className, ...other } = props;

  return (
    <thead {...other} className={className}>
      {children}
    </thead>
  );
};

DataTableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const DataTableBody = ({ ...props }) => {
  const { className, children, ...other } = props;

  return (
    <tbody {...other} className={className}>
      {children}
    </tbody>
  );
};

DataTableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const DataTableToolbarContent = ({ ...props }) => {
  const { className, children, ...other } = props;

  const toolbarContentClasses = classNames(className, 'bx--toolbar-content');

  return (
    <div className={toolbarContentClasses} {...other}>
      {children}
    </div>
  );
};

DataTableToolbarContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const DataTableToolbarAction = ({ ...props }) => {
  const { className, iconName, iconDescription, ...other } = props;

  const toolbarActionClasses = classNames(className, 'bx--toolbar-action');

  return (
    <button className={toolbarActionClasses} {...other}>
      <Icon
        className="bx--toolbar-action__icon"
        name={iconName}
        description={iconDescription}
      />
    </button>
  );
};

DataTableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconName: PropTypes.string,
  iconDescription: PropTypes.string,
};

export const DataTableToolbar = ({ ...props }) => {
  const { className, children, ...other } = props;

  const toolbarClasses = classNames(className, 'bx--table-toolbar');

  return (
    <section className={toolbarClasses} {...other}>
      {children}
    </section>
  );
};

DataTableToolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const DataTableActionList = ({ ...props }) => {
  const { className, children, ...other } = props;

  const actionListClasses = classNames(className, 'bx--action-list');

  return (
    <div className={actionListClasses} {...other}>
      {children}
    </div>
  );
};

DataTableActionList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const DataTableBatchAction = ({ ...props }) => {
  const { className, children, ...other } = props;

  return (
    <Button
      small
      kind="ghost"
      className={className}
      icon="add--glyph"
      iconDescription="Add"
      {...other}>
      {children}
    </Button>
  );
};

DataTableBatchAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const DataTableBatchActions = ({ ...props }) => {
  const {
    className,
    children,
    showBatchActions,
    totalSelected,
    handleClick,
    ...other
  } = props;

  const batchActionsClasses = classNames(
    {
      'bx--batch-actions': true,
      'bx--batch-actions--active': showBatchActions,
    },
    className
  );

  return (
    <div className={batchActionsClasses} {...other}>
      {children}
      <div className="bx--batch-summary">
        <p className="bx--batch-summary__para">
          <span>{totalSelected}</span>{' '}
          {totalSelected > 1 ? 'items selected' : 'item selected'}
        </p>
        <button className="bx--batch-summary__cancel" onClick={handleClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

DataTableBatchAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  showBatchActions: PropTypes.bool,
  totalSelected: PropTypes.number,
  handleClick: PropTypes.func,
};

export class DataTableContainer extends Component {
  render() {
    const tableContainerClasses = classNames(
      className,
      'bx--data-table-v2-container'
    );
    const { children, className, title, ...other } = this.props;
    return (
      <div className={tableContainerClasses} {...other}>
        <h4 className="bx--data-table-v2-header">{title}</h4>
        {children}
      </div>
    );
  }
}

DataTableContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  title: PropTypes.string,
};

export const DataTableSearch = props => {
  const { className, searchContainerClass, onChange, ...other } = props;

  const searchContainerClasses = classNames(
    searchContainerClass,
    'bx--toolbar-search-container'
  );

  return (
    <div className={searchContainerClasses}>
      <Search
        className={className}
        {...other}
        small
        id="search-2"
        labelText="Filter table"
        placeHolderText="Search"
        onChange={onChange}
      />
    </div>
  );
};

DataTableSearch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  searchContainerClasses: PropTypes.string,
};

export const DataTableSelectAll = props => {
  const { className, onClick, checked, ...other } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <th>
      <input
        checked={checked}
        onClick={handleClick}
        type="checkbox"
        className={classNames(className, 'bx--checkbox')}
        {...other}
        value="green"
        name="checkbox-20"
        id="bx--checkbox-20"
      />
      <label htmlFor="bx--checkbox-20" className="bx--checkbox-label">
        <span className="bx--checkbox-appearance">
          <svg
            className="bx--checkbox-checkmark"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fillRule="evenodd">
            <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z" />
          </svg>
        </span>
      </label>
    </th>
  );
};

DataTableSelectAll.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};
