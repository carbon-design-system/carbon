import Promise from 'bluebird'; // For testing on browsers not supporting Promise
import shouldIssueBeIgnoredGlobal from './global-ignore-aat-issues';

export default async function testAATCompliance(content, filename, shouldIssueBeIgnored) {
  const doc = content.ownerDocument;
  const filterFuncs = [];
  if (typeof shouldIssueBeIgnored === 'function') {
    filterFuncs.push(shouldIssueBeIgnored);
  }
  filterFuncs.push(shouldIssueBeIgnoredGlobal);
  const results = await new Promise((resolve) => {
    AAT.getCompliance(content, filename, resolve);
  });
  if (!results.reports) {
    throw results.details || new Error('a11y test result is not available for unknown reason.');
  }
  const code = AAT.assertCompliance(results);
  if (code !== 0) {
    const issues = results.reports
      .reduce((cumulated, report) => {
        cumulated.push(...report.issues);
        return cumulated;
      }, [])
      .filter(filterFuncs.length === 0 ? () => true : (issue) => {
        const elem = doc && doc.evaluate(issue.xpath, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
        return !filterFuncs.some(filterFunc => filterFunc(issue, elem));
      });
    if (issues.length > 0) {
      throw new Error(`a11y compliance test failed. Code: ${code}, Details:\n${JSON.stringify(issues, null, 2)}`);
    }
  }
}
