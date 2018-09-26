import * as CarbonIcons from '../../es';

const App = ({ icons }) => (
  <div className="icon-list">
    {Object.keys(icons)
      .sort()
      .map(key => {
        const icon = icons[key];
        const svg = js2svg(icon);

        return (
          <article className="icon-example">
            <header className="icon-name">{icon.name}</header>
            <div className="icon">{svg}</div>
          </article>
        );
      })}
  </div>
);

render(<App icons={CarbonIcons} />, document.getElementById('root'));

if (module.hot) {
  module.hot.dispose(() => {
    document.getElementById('root').innerHTML = '';
  });
}

function render(element, node) {
  for (const child of node.children) {
    child.parentNode.removeChild(child);
  }

  node.appendChild(element);
}

function createElement(descriptor, attrs, ...children) {
  if (typeof descriptor === 'function') {
    return descriptor({
      ...attrs,
      children,
    });
  }
  const node = document.createElement(descriptor);

  if (attrs) {
    for (const attr of Object.keys(attrs)) {
      if (attr === 'class' || attr === 'className') {
        node.classList.add(attrs[attr]);
      } else {
        node.setAttribute(attr, attrs[attr]);
      }
    }
  }

  if (children.length > 0) {
    const flattenedChildren = children.reduce(
      (acc, child) => acc.concat(child),
      []
    );
    for (const child of flattenedChildren) {
      if (typeof child === 'string') {
        node.appendChild(document.createTextNode(child));
      } else {
        node.appendChild(child);
      }
    }
  }

  return node;
}

function js2svg(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  const node = document.createElementNS('http://www.w3.org/2000/svg', elem);

  for (const attr of Object.keys(attrs)) {
    node.setAttribute(attr, attrs[attr]);
  }

  for (const child of content) {
    node.appendChild(js2svg(child));
  }

  return node;
}
