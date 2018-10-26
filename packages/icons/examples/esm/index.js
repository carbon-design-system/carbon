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
      </tr>
    </thead>
    <tbody>
      {Object.keys(icons)
        .sort()
        .map(key => {
          const icon = icons[key];
          const { width, height } = icon.attrs;
          const svg = js2svg(icon);
          return (
            <tr key={`${icon.name}-${width}x${height}`}>
              <td className="icon-name">{icon.name}</td>
              <td className="icon-size">{`${width}x${height}`}</td>
              <td>
                <div className={`icon-preview icon-preview--${width}`}>
                  {svg}
                </div>
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

render();

if (module.hot) {
  module.hot.dispose(() => {
    render();
  });
}
