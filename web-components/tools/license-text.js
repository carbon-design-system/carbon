/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const currentYear = new Date().getFullYear();
const licenseText = `Copyright IBM Corp\\..* \\d+.*This source code is licensed under the Apache-2\\.0 license found in the
.*LICENSE file in the root directory of this source tree.`;
const licenseTextCurrentYear = `Copyright IBM Corp\\. (\\d+, +)?${currentYear}
.*This source code is licensed under the Apache-2\\.0 license found in the
.*LICENSE file in the root directory of this source tree.`;
const licenseTextSingleYear = `Copyright IBM Corp\\. \\d+(?=\\s)`;
const licenseTextRange = `(Copyright IBM Corp\\. \\d+, )\\d+(?=\\s)`;
const reLicenseText = new RegExp(licenseText, 's');
reLicenseText.currentYear = currentYear;
reLicenseText.reLicenseTextCurrentYear = new RegExp(
  licenseTextCurrentYear,
  's'
);
reLicenseText.reLicenseTextSingleYear = new RegExp(licenseTextSingleYear, 's');
reLicenseText.reLicenseTextRange = new RegExp(licenseTextRange, 's');

module.exports = reLicenseText;
