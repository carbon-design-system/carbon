import React from 'react';
import ReactDOM from 'react-dom';
import meta from '../../meta.json';

const GITHUB_ICON_URL =
  'https://github.com/IBM/carbon-elements/tree/master/packages/icons/src/svg';

const App = ({ meta }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Preview</th>
        <th>Download</th>
        <th>GitHub</th>
        <th>Issues</th>
        <th>Module</th>
      </tr>
    </thead>
    <tbody>
      {meta.map(info => {
        const {
          basename,
          descriptor,
          filename,
          moduleName,
          prefix,
          size,
        } = info;
        const { attrs } = descriptor;
        const svg = js2svg(descriptor);
        const downsized = size === 20 || size === 24;
        const name = downsized
          ? prefix.join('/') + '/' + basename + ` (Downsized to ${size})`
          : prefix.join('/') + '/' + basename;
        const id = window.encodeURIComponent(name);

        const download = ['..', '..', 'svg', ...prefix, filename].join('/');
        const source = [GITHUB_ICON_URL, ...prefix, filename].join('/');

        return (
          <tr key={id} id={id}>
            <td className="icon-name">
              <a href={`#${id}`}>{name}</a>
            </td>
            <td className="icon-size">{`${attrs.width}x${attrs.height}`}</td>
            <td className="icon-preview-container">
              <div className="icon-preview">{svg}</div>
            </td>
            <td>
              <a href={download} download>
                Download
              </a>
            </td>
            <td>
              <a href={source} rel="noopener noreferrer" target="_blank">
                Source
              </a>
            </td>
            <td>
              <a
                href={getBugTemplate(info, source)}
                rel="noopener noreferrer"
                target="_blank">
                Template
              </a>
            </td>
            <td>{moduleName}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

function render() {
  ReactDOM.render(<App meta={meta} />, document.getElementById('root'));
}

function js2svg(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  return React.createElement(elem, format(attrs), ...content.map(js2svg));
}

function format(attrs) {
  const { 'fill-rule': fillRule, ...rest } = attrs;
  return {
    ...rest,
    fillRule,
  };
}

function getBugTemplate(info, source) {
  const url = new URL('https://github.com/IBM/carbon-elements/issues/new');
  const params = new URLSearchParams();
  params.append('title', `🔍 Visual bug for the \`${info.filename}\` icon`);
  params.append(
    'body',
    `<!-- Feel free to remove sections that aren't relevant. -->

There is an issue for the \`${
      info.basename
    }\` icon when viewing [the elements demo](https://ibm.github.io/carbon-elements/icons/examples/esm/index.html).

The source for this icon is available [here](${source}).

## Detailed description

> Describe in detail the issue you're having.

> Is this a feature request (new component, new icon), a bug, or a general issue?

> Is this issue related to a specific component?

> What did you expect to happen? What happened instead? What would you like to see changed?

> What browser are you working in?

> What version of the Carbon Design System are you using?

> What offering/product do you work on? Any pressing ship or release dates we should be aware of?

## Steps to reproduce the issue

1. Step one
2. Step two
3. Step three
4. etc.

## Additional information

- Screenshots or code
- Notes
`
  );
  url.search = params;
  return url.href;
}

render();

if (module.hot) {
  module.hot.dispose(() => {
    render();
  });
}
