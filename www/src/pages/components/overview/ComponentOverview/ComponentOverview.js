import React from 'react';
import { Link } from 'gatsby';

class ComponentOverview extends React.Component {
  renderItems = currentItem => {
    const component = currentItem.component;
    let componentUrl;
    if (component === 'Multiselect') {
      componentUrl = '/components/dropdown';
    } else if (component === 'UI shell') {
      componentUrl = '/experimental/ui-shell';
    } else {
      componentUrl = `/components/${component.toLowerCase().replace(' ', '-')}`;
    }

    let componentImg;
    try {
      componentImg = require(`../../content/components/overview/images/${component}.svg`);
    } catch (e) {
      componentImg = require('../../content/components/overview/images/NoImage.svg');
    }

    return (
      <li className="component-item" key={component}>
        <div className="bx--aspect-ratio bx--aspect-ratio--align bx--aspect-ratio--1x1">
          <div className="bx--aspect-ratio--object">
            <Link to={componentUrl} className="component-item__link">
              <img
                src={componentImg}
                alt={component}
                className="component-item__img"
              />
              <p className="component-name">{component}</p>
            </Link>
          </div>
        </div>
      </li>
    );
  };

  render() {
    const componentList = require('../../data/components.json'); // eslint-disable-line
    return (
      <div className="bx--row">
        <div className="bx--col-lg-12 bx--offset-lg-4 bx--no-gutter">
          <ul className="component-overview">
            {Object.keys(componentList.components).map(component => {
              return this.renderItems(componentList.components[component]);
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ComponentOverview;
