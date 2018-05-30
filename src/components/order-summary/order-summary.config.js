'use strict';

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Order Summary',
      notes: `
        This component is used to display the items a user will be purchasing.
        This version does not include OrderSummaryCategory.
      `,
    },
    {
      name: 'with-category',
      label: 'With category',
      notes: `
        This component is used to display the items a user will be purchasing.
        The category version of OrderSummary can break the items being purchased into categories.
      `,
      context: {
        hasCategory: true,
      },
    },
  ],
};
