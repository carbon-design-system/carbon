import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Icon from './Icon';
import Select from './Select';
import SelectItem from './SelectItem';
import TextInput from './TextInput';

import { equals } from '../lib/array';

import '@console/bluemix-components/consumables/scss/components/pagination/pagination.scss';

class Pagination extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalItems: PropTypes.number.isRequired,
  }
  static defaultProps = {
    onChange: () => {},
  }
  static uuid = 0
  state = {
    page: 1,
    pageSize: this.props.pageSizes[0],
  }
  componentWillReceiveProps({ pageSizes }) {
    if (!equals(pageSizes, this.props.pageSizes)) {
      this.setState({ pageSize: pageSizes[0], page: 1 });
    }
  }
  id = Pagination.uuid++
  handleSizeChange = (evt) => {
    const pageSize = Number(evt.target.value);
    this.setState({ pageSize, page: 1 });
    this.props.onChange({ page: 1, pageSize });
  }
  handlePageInputChange = (evt) => {
    const page = Number(evt.target.value);
    if (page > 0 && page <= Math.ceil(this.props.totalItems / this.state.pageSize)) {
      this.setState({ page });
      this.props.onChange({ page, pageSize: this.state.pageSize });
    }
  }
  incrementPage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  }
  decrementPage = () => {
    const page = this.state.page - 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  }
  render() {
    const {
      className,
      pageSizes,
      totalItems,
    } = this.props;
    const {
      page,
      pageSize,
    } = this.state;
    const classNames = classnames('bx--pagination', className);

    return (
      <div className={classNames}>
        <div className="bx--pagination__left">
          <Select
            id={`bx-pagination-select-${this.id}`}
            labelText="Number of items per page"
            hideLabel
            onChange={this.handleSizeChange}
            value={pageSize}
          >
            {pageSizes.map(size => <SelectItem key={size} value={size} text={String(size)} />)}
          </Select>
          <span className="bx--pagination__text">Items per page&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span className="bx--pagination__text">
            <span>{pageSize * (page - 1) + 1}-{Math.min(page * pageSize, totalItems)}</span> of <span>{totalItems}</span> items
          </span>
        </div>
        <div className="bx--pagination__right">
          <span className="bx--pagination__text">
            <span>{page}</span> of <span>{Math.ceil(totalItems / pageSize)}</span> pages
          </span>
          <button
            className="bx--pagination__button bx--pagination__button--backward"
            onClick={this.decrementPage}
            disabled={page === 1}
          >
            <div>
              <Icon name="chevron--left" description="Backward" />
            </div>
          </button>
          <TextInput
            id={`bx-pagination-input-${this.id}`}
            placeholder="0"
            value={page}
            onChange={this.handlePageInputChange}
            labelText="Page number input"
            hideLabel
          />
          <button
            className="bx--pagination__button bx--pagination__button--forward"
            onClick={this.incrementPage}
            disabled={page === Math.ceil(totalItems / pageSize)}
          >
            <div>
              <Icon name="chevron--right" description="Forward" />
            </div>
          </button>
        </div>
      </div>

    );
  }
}

export default Pagination;
