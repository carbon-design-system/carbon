import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import { equals } from '../../tools/array';

export default class Pagination extends Component {
  static propTypes = {
    backwardText: PropTypes.string,
    className: PropTypes.string,
    itemRangeText: PropTypes.func,
    forwardText: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    itemsPerPageText: PropTypes.string,
    itemText: PropTypes.func,
    onChange: PropTypes.func,
    pageNumberText: PropTypes.string,
    pageRangeText: PropTypes.func,
    pageText: PropTypes.func,
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalItems: PropTypes.number,
    disabled: PropTypes.bool,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    pagesUnknown: PropTypes.bool,
    isLastPage: PropTypes.bool,
    pageInputDisabled: PropTypes.bool,
  };

  static defaultProps = {
    backwardText: 'Backward',
    itemRangeText: (min, max, total) => `${min}-${max} of ${total} items`,
    forwardText: 'Forward',
    itemsPerPageText: 'items per page',
    onChange: () => {},
    pageNumberText: 'Page Number',
    pageRangeText: (current, total) => `${current} of ${total} pages`,
    disabled: false,
    page: 1,
    pagesUnknown: false,
    isLastPage: false,
    pageInputDisabled: false,
    itemText: (min, max) => `${min}-${max} items`,
    pageText: page => `page ${page}`,
  };

  state = {
    page: this.props.page,
    pageSize:
      this.props.pageSize && this.props.pageSizes.includes(this.props.pageSize)
        ? this.props.pageSize
        : this.props.pageSizes[0],
  };

  componentWillMount() {
    this.uniqueId = `${Math.floor(Math.random() * 0xffff)}`;
  }

  componentWillReceiveProps({ pageSizes, page, pageSize }) {
    if (!equals(pageSizes, this.props.pageSizes)) {
      this.setState({ pageSize: pageSizes[0], page: 1 });
    }
    if (page !== this.props.page) {
      this.setState({
        page,
      });
    }
    if (pageSize !== this.props.pageSize) {
      this.setState({ pageSize });
    }
  }

  handleSizeChange = evt => {
    const pageSize = Number(evt.target.value);
    this.setState({ pageSize, page: 1 });
    this.props.onChange({ page: 1, pageSize });
  };

  handlePageInputChange = evt => {
    const page = Number(evt.target.value);
    if (
      page > 0 &&
      page <= Math.ceil(this.props.totalItems / this.state.pageSize)
    ) {
      this.setState({ page });
      this.props.onChange({ page, pageSize: this.state.pageSize });
    }
  };

  incrementPage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  decrementPage = () => {
    const page = this.state.page - 1;
    this.setState({ page });
    this.props.onChange({ page, pageSize: this.state.pageSize });
  };

  render() {
    const {
      backwardText,
      className,
      forwardText,
      id,
      itemsPerPageText,
      itemRangeText,
      pageNumberText,
      pageRangeText,
      pageSize, // eslint-disable-line no-unused-vars
      pageSizes,
      itemText,
      pageText,
      pagesUnknown,
      isLastPage,
      pageInputDisabled,
      totalItems,
      onChange, // eslint-disable-line no-unused-vars
      page: pageNumber, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const statePage = this.state.page;
    const statePageSize = this.state.pageSize;
    const classNames = classnames('bx--pagination', className);
    const inputId = id || this.uniqueId;

    return (
      <div className={classNames} {...other}>
        <div className="bx--pagination__left">
          <Select
            id={`bx-pagination-select-${inputId}`}
            labelText={itemsPerPageText}
            hideLabel
            onChange={this.handleSizeChange}
            value={statePageSize}>
            {pageSizes.map(size => (
              <SelectItem key={size} value={size} text={String(size)} />
            ))}
          </Select>
          <span className="bx--pagination__text">
            {itemsPerPageText}&nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span className="bx--pagination__text">
            {pagesUnknown
              ? itemText(
                  statePageSize * (statePage - 1) + 1,
                  statePage * statePageSize
                )
              : itemRangeText(
                  statePageSize * (statePage - 1) + 1,
                  Math.min(statePage * statePageSize, totalItems),
                  totalItems
                )}
          </span>
        </div>
        <div className="bx--pagination__right">
          <span className="bx--pagination__text">
            {pagesUnknown
              ? pageText(statePage)
              : pageRangeText(statePage, Math.ceil(totalItems / statePageSize))}
          </span>
          <button
            className="bx--pagination__button bx--pagination__button--backward"
            onClick={this.decrementPage}
            disabled={this.props.disabled || statePage === 1}>
            <Icon
              className="bx--pagination__button-icon"
              name="chevron--left"
              description={backwardText}
            />
          </button>
          {pageInputDisabled ? (
            <span className="bx--pagination__text">|</span>
          ) : (
            <TextInput
              id={`bx-pagination-input-${inputId}`}
              placeholder="0"
              value={statePage}
              onChange={this.handlePageInputChange}
              labelText={pageNumberText}
              hideLabel
            />
          )}
          <button
            className="bx--pagination__button bx--pagination__button--forward"
            onClick={this.incrementPage}
            disabled={
              this.props.disabled ||
              statePage === Math.ceil(totalItems / statePageSize) ||
              isLastPage
            }>
            <Icon
              className="bx--pagination__button-icon"
              name="chevron--right"
              description={forwardText}
            />
          </button>
        </div>
      </div>
    );
  }
}
