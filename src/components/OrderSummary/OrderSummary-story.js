/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  OrderSummary,
  OrderSummaryHeader,
  OrderSummaryCategory,
  OrderSummaryList,
  OrderSummaryListItem,
  OrderSummaryTotal,
  OrderSummaryFooter,
} from '../OrderSummary';
import Button from '../Button';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

storiesOf('OrderSummary', module)
  .addWithInfo(
    'Simple',
    `
      This component is used to display the items a user will be purchasing. This version does not include OrderSummaryCategory.
    `,
    () => (
      <OrderSummary>
        <OrderSummaryHeader title="Order Summary">
          <Dropdown
            onChange={selectedItemInfo => console.log(selectedItemInfo)}
            defaultText="USD">
            <DropdownItem itemText="USD" value="usd" />
            <DropdownItem itemText="GBP" value="gbp" />
            <DropdownItem itemText="NOK" value="nok" />
            <DropdownItem itemText="EUR" value="eur" />
          </Dropdown>
        </OrderSummaryHeader>
        <OrderSummaryList>
          <OrderSummaryListItem />
          <OrderSummaryListItem text="Detail 2" price="$20.00" />
          <OrderSummaryListItem text="Detail 3" price="$40.00" />
        </OrderSummaryList>
        <OrderSummaryTotal
          summaryText="Total due now:"
          summaryPrice="$0.00"
          summaryDetails="estimated">
          <Button>Primary Button</Button>
          <Button kind="secondary">Primary Button</Button>
        </OrderSummaryTotal>
        <OrderSummaryFooter
          footerText="Need Help?"
          linkText="Contact Bluemix Sales"
          href="www.google.com"
        />
      </OrderSummary>
    )
  )
  .addWithInfo(
    'Category',
    `
      This component is used to display the items a user will be purchasing. The category version of OrderSummary can break the items being purchased into categories.
    `,
    () => (
      <OrderSummary>
        <OrderSummaryHeader title="Order Summary">
          <Dropdown
            onChange={selectedItemInfo => console.log(selectedItemInfo)}
            defaultText="USD">
            <DropdownItem itemText="USD" value="usd" />
            <DropdownItem itemText="GBP" value="gbp" />
            <DropdownItem itemText="NOK" value="nok" />
            <DropdownItem itemText="EUR" value="eur" />
          </Dropdown>
        </OrderSummaryHeader>

        <OrderSummaryList>
          <OrderSummaryCategory>
            <OrderSummaryListItem />
            <OrderSummaryListItem text="Detail 2" price="$20.00" />
            <OrderSummaryListItem text="Detail 3" price="$40.00" />
          </OrderSummaryCategory>
          <OrderSummaryCategory>
            <OrderSummaryListItem />
            <OrderSummaryListItem text="Detail 2" price="$20.00" />
            <OrderSummaryListItem text="Detail 3" price="$40.00" />
          </OrderSummaryCategory>
          <OrderSummaryCategory>
            <OrderSummaryListItem />
            <OrderSummaryListItem text="Detail 2" price="$20.00" />
            <OrderSummaryListItem text="Detail 3" price="$40.00" />
          </OrderSummaryCategory>
        </OrderSummaryList>
        <OrderSummaryTotal
          summaryText="Total due now:"
          summaryPrice="$0.00"
          summaryDetails="estimated">
          <Button>Primary Button</Button>
          <Button kind="secondary">Primary Button</Button>
        </OrderSummaryTotal>
        <OrderSummaryFooter
          footerText="Need Help?"
          linkText="Contact Bluemix Sales"
          href="www.google.com"
        />
      </OrderSummary>
    )
  );
