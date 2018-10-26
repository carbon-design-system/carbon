import React from 'react';
import ReactDOM from 'react-dom';
import * as CarbonIcons from '../../es';

const App = ({ icons }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Preview</th>
        <th>GitHub</th>
        <th>Report Issue</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(icons)
        .sort()
        .map(key => {
          const icon = icons[key];
          const { attrs, glyph } = icon;
          const { width, height } = attrs;
          const variant = glyph ? 'glyph' : width;
          const svg = js2svg(icon);
          const id = `${icon.name}-${width}x${height}`;
          return (
            <tr key={id} id={id}>
              <td className="icon-name">
                <a href={`#${id}`}>{icon.name}</a>
              </td>
              <td className="icon-size">{`${width}x${height}`}</td>
              <td>
                <div className={`icon-preview icon-preview--${variant}`}>
                  {svg}
                </div>
              </td>
              <td>
                <a
                  href={getLink(icon)}
                  rel="noopener noreferrer"
                  target="_blank">
                  Source
                </a>
              </td>
              <td>
                <a
                  href={getBugTemplate(icon)}
                  rel="noopener noreferrer"
                  target="_blank">
                  Issue Template
                </a>
              </td>
            </tr>
          );
        })}
    </tbody>
  </table>
);

function render() {
  ReactDOM.render(<App icons={CarbonIcons} />, document.getElementById('root'));
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

function getLink(icon) {
  const baseUrl =
    'https://github.com/IBM/carbon-elements/tree/master/packages/icons/src/svg';
  return `${baseUrl}/${icon.size}/${icon.name}.svg`;
}

function getBugTemplate(icon) {
  const url = new URL('https://github.com/IBM/carbon-elements/issues/new');
  const params = new URLSearchParams();
  params.append('title', `🔍 Visual bug for the \`${icon.name}\` icon`);
  params.append(
    'body',
    `<!-- Feel free to remove sections that aren't relevant. -->

There is an issue for the ${
      icon.name
    } icon when viewing [the elements demo](https://ibm.github.io/carbon-elements/icons/examples/esm/index.html).

The source for this icon is available [here](${getLink(icon)}).

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
