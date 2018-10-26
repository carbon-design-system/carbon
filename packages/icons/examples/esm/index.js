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
          return (
            <tr key={`${icon.name}-${width}x${height}`}>
              <td className="icon-name">{icon.name}</td>
              <td className="icon-size">{`${width}x${height}`}</td>
              <td>
                <div className={`icon-preview icon-preview--${variant}`}>
                  {svg}
                </div>
              </td>
              <td>
                <a href={getLink(icon)} rel="noopener noreferrer">
                  Source
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

render();

if (module.hot) {
  module.hot.dispose(() => {
    render();
  });
}
