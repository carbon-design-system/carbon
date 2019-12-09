module.exports = {
  // optional - Specify the rule archive
  // Default: latest
  // Run `npx aat archives` for a list of valid ruleArchive ids and policy ids
  ruleArchive: '2019SeptDeploy',

  // optional - Specify one or many policies to scan.
  // Run `npx aat archives` for a list of valid ruleArchive ids and policy ids
  policies: ['IBM_Accessibility'],

  // optional - Specify one or many violation levels on which to fail the test
  //            i.e. If specified violation then the testcase will only fail if
  //                 a violation is found during the scan.
  // i.e. failLevels: ["violation"]
  // i.e. failLevels: ["violation","potential violation"] or refer to below as a list
  // Default: ["violation","potential violation"]
  failLevels: ['violation'],

  // optional - Specify one or many violation levels which should be reported
  //            i.e. If specified violation then in the report it would only contain
  //                 results which are level of violation.
  // i.e. reportLevels: ["violation"]
  // Valid values: violation, potentialviolation, recommendation, potentialrecommendation, manual
  // Default: ["violation","potential violation"]
  reportLevels: ['violation'],

  // Optional - Which type should the results be outputted to
  // Valid values: json, csv
  // Default: json
  outputFormat: ['json'],

  // Optional - Specify labels that you would like associated to your scan
  //
  // i.e.
  //   label: ["Firefox","master","V12","Linux"]
  // Default: N/A
  label: [],

  // optional - Where the scan results should be saved.
  // Default: results
  outputFolder: '.aat/results',

  // optional - Where the baseline results should be loaded from
  // Default: baselines
  baselineFolder: '.aat/baselines',
};
