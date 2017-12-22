import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DataTableRow from '../DataTableRow';
import DataTableData from '../DataTableData';
import {
  DataTable,
  DataTableToolbar,
  DataTableToolbarContent,
  DataTableToolbarAction,
  DataTableHead,
  DataTableColumnHeader,
  DataTableBody,
  DataTableBatchActions,
  DataTableActionList,
  DataTableBatchAction,
  DataTableSearch,
  DataTableContainer,
  DataTableSelectAll,
} from '../DataTable';
import PaginationV2 from '../PaginationV2';
import Button from '../Button';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';

const paginationProps = {
  pageSizes: [10, 20, 30, 40, 50],
};

const initialRows = [
  {
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Kevins VM Groups',
    status: 'Active',
  },
  {
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Maureens VM Groups',
    status: 'Active',
  },
  {
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    something: '80',
    rule: 'Round Robin',
    attached_groups: 'Andrews VM Groups',
    status: 'Active',
  },
];

const initialExpandedRows = [
  {
    rowContent: {
      name: 'Load Balancer 3',
      protocol: 'HTTP',
      something: '80',
      rule: 'Round Robin',
      attached_groups: 'Kevins VM Groups',
      status: 'Active',
    },
    expandedRowContent: {
      html: `<div>
      <h1>Expandable Row Content 1</h1>
      <p>Description here.</p>
    </div>`,
    },
  },
  {
    rowContent: {
      name: 'Load Balancer 1',
      protocol: 'HTTP',
      something: '80',
      rule: 'Round Robin',
      attached_groups: 'Maureens VM Groups',
      status: 'Active',
    },
    expandedRowContent: {
      html: `<div>
      <h1>Expandable Row Content 2</h1>
      <p>Description here.</p>
    </div>`,
    },
  },
  {
    rowContent: {
      name: 'Load Balancer 2',
      protocol: 'HTTP',
      something: '80',
      rule: 'Round Robin',
      attached_groups: 'Andrews VM Groups',
      status: 'Active',
    },
    expandedRowContent: {
      html: `<div>
      <h1>Expandable Row Content 3</h1>
      <p>Description here.</p>
    </div>`,
    },
  },
];

const headers = Object.keys(initialRows[0]).map(key => ({
  key,
  title: key.charAt(0).toUpperCase() + key.substring(1),
}));

class BasicDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      selectAll: false,
      rows: this.props.rows,
      filteredRows: this.props.rows,
    };
  }

  static propTypes = {
    zebra: PropTypes.bool,
    rows: PropTypes.array,
    isSelectable: PropTypes.bool,
  };

  static defaultProps = {
    zebra: true,
    rows: initialRows,
    isSelectable: true,
  };

  selectAll = () => {
    const checked = this.state.checked;
    this.state.rows.forEach((row, index) => {
      if (this.state.selectAll) {
        checked[index] = false;
      } else {
        checked[index] = true;
      }
    });
    this.setState({
      checked,
      selectAll: !this.state.selectAll,
    });
  };

  selectRow = index => {
    const checked = this.state.checked;
    checked[index] = checked[index] ? !checked[index] : true;
    this.setState({
      checked,
      selectAll: checked[index] === false ? false : this.state.selectAll,
    });
  };

  clearAll = () => {
    const checked = this.state.checked;
    this.state.rows.forEach((row, index) => {
      checked[index] = checked[index] ? !checked[index] : false;
    });
    this.setState({
      checked,
      selectAll: false,
    });
  };

  getCheckedItems = () => {
    const checked = this.state.checked;
    let checkedItems = 0;
    checked.forEach(entry => {
      if (entry) {
        checkedItems++;
      }
    });
    return checkedItems;
  };

  searchTable = evt => {
    let newRows = [];
    this.state.rows.map(obj => {
      Object.keys(obj).forEach(key => {
        if (
          obj[key]
            .toUpperCase()
            .includes(evt.currentTarget.value.toUpperCase()) &&
          !newRows.includes(obj)
        ) {
          newRows.push(obj);
        }
      });
    });
    this.setState({
      filteredRows: newRows,
    });
  };

  render() {
    const checkedItems = this.getCheckedItems();
    const showBatchActions = checkedItems > 0;
    const tableClasses = classNames({
      'bx--data-table-v2': true,
      'bx--data-table-v2--zebra': this.props.zebra,
    });
    const { isSelectable } = this.props;
    return (
      <div>
        <DataTableContainer title="Table title">
          <DataTableToolbar>
            <DataTableBatchActions
              totalSelected={checkedItems}
              showBatchActions={showBatchActions}
              handleClick={this.clearAll}>
              <DataTableActionList>
                <DataTableBatchAction onClick={action('Batch Action 1')}>
                  Ghost
                </DataTableBatchAction>
                <DataTableBatchAction onClick={action('Batch Action 2')}>
                  Ghost
                </DataTableBatchAction>
                <DataTableBatchAction onClick={action('Batch Action 3')}>
                  Ghost
                </DataTableBatchAction>
              </DataTableActionList>
            </DataTableBatchActions>
            <DataTableSearch
              onInput={this.searchTable}
              onChange={this.searchTable}
            />
            <DataTableToolbarContent>
              <DataTableToolbarAction
                iconName="download"
                iconDescription="Download"
                onClick={action('Toolbar Action 1')}
              />
              <DataTableToolbarAction
                iconName="edit"
                iconDescription="Edit"
                onClick={action('Toolbar Action 1')}
              />
              <DataTableToolbarAction
                iconName="settings"
                iconDescription="Settings"
                onClick={action('Toolbar Action 1')}
              />
              <Button onClick={action('Add new row')} kind="primary">
                Add new
              </Button>
            </DataTableToolbarContent>
          </DataTableToolbar>
          <DataTable
            initialRows={initialRows}
            headers={headers}
            render={({ headers, getHeaderProps }) => (
              <table className={tableClasses}>
                <DataTableHead>
                  <DataTableRow>
                    {isSelectable && (
                      <DataTableSelectAll
                        checked={this.state.selectAll}
                        onClick={this.selectAll}
                      />
                    )}
                    {headers.map(header => (
                      <DataTableColumnHeader
                        key={header.key}
                        sortable={true}
                        {...getHeaderProps(header)}>
                        {header.title}
                      </DataTableColumnHeader>
                    ))}
                    <DataTableColumnHeader />
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {this.state.filteredRows.map((row, i) => {
                    return (
                      <DataTableRow key={`row${i}`}>
                        <DataTableData
                          onClick={() => this.selectRow(i)}
                          key={`a${i}`}
                          isSelectable={true}
                          isSelected={
                            this.state.checked[i]
                              ? this.state.checked[i]
                              : false
                          }
                        />
                        {Object.keys(row).map((rowData, j) => {
                          return (
                            <DataTableData key={`rowdata${j}`}>
                              {row[rowData]}
                            </DataTableData>
                          );
                        })}
                        <DataTableData
                          className="bx--table-overflow"
                          key={`c${i}`}>
                          <OverflowMenu flipped floatingMenu>
                            <OverflowMenuItem itemText="Option 1" />
                            <OverflowMenuItem itemText="Option 2" />
                            <OverflowMenuItem itemText="Option 3" />
                            <OverflowMenuItem itemText="Option 4" />
                            <OverflowMenuItem
                              itemText="Danger option"
                              hasDivider
                              isDelete
                            />
                          </OverflowMenu>
                        </DataTableData>
                      </DataTableRow>
                    );
                  })}
                </DataTableBody>
              </table>
            )}
          />
        </DataTableContainer>
        <PaginationV2 {...paginationProps} totalItems={50} />
      </div>
    );
  }
}

class ExpandableDataTable extends Component {
  state = {
    expanded: [],
    selectAll: false,
    rows: this.props.rows,
  };

  static propTypes = {
    zebra: PropTypes.bool,
    rows: PropTypes.array,
  };

  static defaultProps = {
    zebra: true,
    rows: initialExpandedRows,
  };

  createNewRow = (content, parent) => {
    const newRow = document.createElement('tr');
    const colspan = Object.keys(this.state.rows[0].rowContent).length + 2;
    parent.dataset.parentRow = '';
    newRow.classList.add('bx--expandable-row-v2');
    newRow.dataset.childRow = '';
    newRow.innerHTML = `
      <td colspan=${colspan}>
        ${content}
      </td>
    `;
    Object.keys(parent.parentElement.children).map(child => {
      if (parent.parentElement.children[child] === parent) {
        parent.parentElement.insertBefore(
          newRow,
          parent.parentElement.childNodes[+child + 1]
        );
        newRow.addEventListener('mouseover', () => {
          parent.classList.add('bx--expandable-row--hover-v2');
        });
        newRow.addEventListener('mouseout', () => {
          parent.classList.remove('bx--expandable-row--hover-v2');
        });
      }
    });
  };

  removeRow = parent => {
    Object.keys(parent.parentElement.children).map(child => {
      if (parent.parentElement.children[child] === parent) {
        parent.parentElement.removeChild(
          parent.parentElement.children[+child + 1]
        );
      }
    });
  };

  expandRow = (index, evt) => {
    const parent = evt.currentTarget.parentElement;
    const expanded = this.state.expanded;
    const rows = this.state.rows;
    if (expanded[index] === true) {
      expanded[index] = false;
    } else {
      expanded[index] = expanded[index] ? !expanded[index] : true;
    }
    this.setState({
      expanded,
    });
    if (this.state.expanded[index]) {
      this.createNewRow(rows[index].expandedRowContent.html, parent);
    } else {
      this.removeRow(parent);
    }
  };

  rowHover = evt => {
    evt.currentTarget.classList.add('bx--expandable-row--hover-v2');
  };

  removeRowHover = evt => {
    evt.currentTarget.classList.remove('bx--expandable-row--hover-v2');
  };

  render() {
    const tableClasses = classNames({
      'bx--data-table-v2': true,
      'bx--data-table-v2--zebra': false,
    });

    return (
      <DataTableContainer title="Table title">
        <DataTable
          initialRows={initialExpandedRows}
          headers={headers}
          render={({ rows, headers }) => (
            <table className={tableClasses}>
              <DataTableHead>
                <DataTableRow>
                  <th />
                  {headers.map(header => (
                    <th key={header.key}>{header.title}</th>
                  ))}
                  <th />
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {rows.map((row, i) => {
                  return (
                    <DataTableRow
                      className={classNames({
                        'bx--parent-row-v2': true,
                        'bx--expandable-row-v2': this.state.expanded[i],
                      })}>
                      <DataTableData
                        onClick={evt => {
                          this.expandRow(i, evt);
                        }}
                        key={`a${i}`}
                        isExpandable={true}
                        isExpanded={
                          this.state.expanded[i]
                            ? this.state.expanded[i]
                            : false
                        }
                      />
                      {Object.keys(row.rowContent).map((content, j) => {
                        return (
                          <DataTableData key={`rowdata${j}`}>
                            {row.rowContent[content]}
                          </DataTableData>
                        );
                      })}
                      <DataTableData
                        className="bx--table-overflow"
                        key={`c${i}`}>
                        <OverflowMenu flipped floatingMenu>
                          <OverflowMenuItem itemText="Option 1" />
                          <OverflowMenuItem itemText="Option 2" />
                          <OverflowMenuItem itemText="Option 3" />
                          <OverflowMenuItem itemText="Option 4" />
                          <OverflowMenuItem
                            itemText="Danger option"
                            hasDivider
                            isDelete
                          />
                        </OverflowMenu>
                      </DataTableData>
                    </DataTableRow>
                  );
                })}
              </DataTableBody>
            </table>
          )}
        />
      </DataTableContainer>
    );
  }
}

storiesOf('DataTable', module)
  .addWithInfo(
    'Data Table',
    `
      Data table
    `,
    () => <BasicDataTable />
  )
  .addWithInfo(
    'Expandable table',
    `
      Expandable table
    `,
    () => <ExpandableDataTable />
  );
