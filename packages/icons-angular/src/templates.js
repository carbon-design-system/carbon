/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { param } = require('change-case');

const componentTemplate = (iconName, className, svg, attrs) => `
import { NgModule, Component, ElementRef, Input } from "@angular/core";
import { getAttributes } from "@carbon/icon-helpers";

@Component({
	selector: "ibm-icon-${iconName}",
	template: \`${svg}\`
})
export class ${className} {
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() focusable: boolean;

  static titleIdCounter = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const svg = this.elementRef.nativeElement.querySelector("svg");

    const attributes = getAttributes({
      width: ${attrs.width},
      height: ${attrs.height},
      viewBox: "${attrs.viewBox}",
      title: this.title,
      "aria-label": this.ariaLabel,
      "aria-labelledby": this.ariaLabelledby,
      "aria-hidden": this.ariaHidden,
      focusable: this.focusable
    });

    const attrKeys = Object.keys(attributes);
    for (let i = 0; i < attrKeys.length; i++) {
      const key = attrKeys[i];
      const value = attributes[key];
      if (key === "title") {
        continue;
      }
      if (value) {
        svg.setAttribute(key, value);
      }
    }

    if (attributes.title) {
      const title = document.createElement("title");
      title.textContent = attributes.title;
      ${className}.titleIdCounter++;
      title.setAttribute("id", \`${iconName}-\$\{${className}.titleIdCounter\}\`);
      svg.appendChild(title);
      svg.setAttribute("aria-labelledby", \`${iconName}-\$\{${className}.titleIdCounter\}\`);
    }
  }
}

@NgModule({
  declarations: [
    ${className}
  ],
  exports: [
    ${className}
  ]
})
export class ${className}Module {}
`;

const iconStoryTemplate = icon => `.add("${icon.moduleName}", () => ({
  template: \`<ibm-icon-${param(icon.moduleName)}></ibm-icon-${param(
  icon.moduleName
)}>\`
}))
.add("${icon.moduleName} with label", () => ({
  template: \`<ibm-icon-${param(
    icon.moduleName
  )} ariaLabel="label for the icon"></ibm-icon-${param(icon.moduleName)}>\`
}))
.add("${icon.moduleName} with title", () => ({
  template: \`<ibm-icon-${param(
    icon.moduleName
  )} title="icon title"></ibm-icon-${param(icon.moduleName)}>\`
}))`;

const gerateIconStories = icons => {
  let value = '';
  for (const icon of icons) {
    value += iconStoryTemplate(icon);
  }
  return value;
};

const storyTemplate = (basename, icons) => `
import { storiesOf, moduleMetadata } from "@storybook/angular";

import { IconModule } from "./../lib";

storiesOf("${basename}", module)
  .addDecorator(moduleMetadata({
    imports: [ IconModule ],
  }))
  ${gerateIconStories(icons)};
`;

module.exports = {
  componentTemplate,
  storyTemplate,
};
