import { getAttributes } from '@carbon/icon-helpers';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import meta from '../../meta.json';

const GITHUB_ICON_URL =
  'https://github.com/IBM/carbon-elements/tree/master/packages/icons/src/svg';

const MODES = {
  expanded: 'expanded',
  minimal: 'minimal',
  standard: 'standard',
};

function App({ meta }) {
  const [mode, setMode] = useState(MODES.standard);
  const headers = [
    'Name',
    'Size',
    'Preview',
    mode !== MODES.minimal && 'Download',
    mode !== MODES.minimal && 'GitHub',
    mode !== MODES.minimal && 'Issues',
    mode === MODES.expanded && 'Module',
    mode === MODES.expanded && 'Relative',
  ].filter(Boolean);

  return (
    <React.Fragment>
      <div>
        {`Viewing mode: ${mode}`}
        <div>
          <button onClick={() => setMode(MODES.minimal)}>Minimal</button>
          <button onClick={() => setMode(MODES.standard)}>Standard</button>
          <button onClick={() => setMode(MODES.expanded)}>Expanded</button>
        </div>
      </div>
      <Table headers={headers}>
        {meta.map(info => {
          const {
            basename,
            descriptor,
            filename,
            moduleName,
            original,
            outputOptions,
            prefix,
            size,
          } = info;
          const { attrs } = descriptor;
          const svg = js2svg(descriptor);
          const name = original
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
              {!(mode === MODES.minimal) && (
                <React.Fragment>
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
                </React.Fragment>
              )}
              {mode === MODES.expanded && (
                <React.Fragment>
                  <td>{moduleName}</td>
                  <td>{outputOptions.file}</td>
                </React.Fragment>
              )}
            </tr>
          );
        })}
      </Table>
    </React.Fragment>
  );
}

function Table({ children, headers }) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function render() {
  ReactDOM.render(<App meta={meta} />, document.getElementById('root'));
}

function js2svg(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  let attributes = attrs;

  if (elem === 'svg') {
    const { style, ...iconAttributes } = getAttributes(attrs);
    attributes = {
      ...iconAttributes,
      style: style
        .split(';')
        .map(declaration => {
          const [property, value] = declaration
            .split(':')
            .map(string => string.trim());
          return {
            [property]: value,
          };
        })
        .reduce(
          (acc, declaration) => ({
            ...acc,
            ...declaration,
          }),
          {}
        ),
    };
  }

  return React.createElement(elem, format(attributes), ...content.map(js2svg));
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
