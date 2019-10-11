/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { param } = require('change-case');
const { pascal } = require('change-case');

const componentTemplate = (iconName, className, svg, attrs) => `
import {
  NgModule,
  Component,
  Directive,
  ElementRef,
  Input,
  AfterViewInit
} from "@angular/core";
import { getAttributes } from "@carbon/icon-helpers";

@Component({
	selector: "ibm-icon-${iconName}",
  template: \`
    <svg
      ibmIcon${pascal(iconName)}
      [ariaLabel]="ariaLabel"
      [ariaLabelledby]="ariaLabelledby"
      [ariaHidden]="ariaHidden"
      [title]="title"
      [isFocusable]="focusable"
      [attr.class]="innerClass">
    </svg>
  \`
})
export class ${className} {
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() focusable: boolean = false;
  @Input() innerClass: string;
}

@Directive({
  selector: "[ibmIcon${pascal(iconName)}]"
})
export class ${className}Directive implements AfterViewInit {
  static titleIdCounter = 0;

  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() isFocusable: boolean = false;

  constructor(protected elementRef: ElementRef) {}

	ngAfterViewInit() {
    const svg = this.elementRef.nativeElement;
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const domParser = new DOMParser();
    const rawSVG = \`${svg}\`;
    const svgElement = domParser.parseFromString(rawSVG, "image/svg+xml").documentElement;

    let node = svgElement.firstChild;
    while (node) {
      // importNode makes a clone of the node
      // this ensures we keep looping over the nodes in the parsed document
      svg.appendChild(svg.ownerDocument.importNode(node, true));
      node = node.nextSibling;
    }

    const attributes = getAttributes({
      width: ${attrs.width},
      height: ${attrs.height},
      viewBox: "${attrs.viewBox}",
      title: this.title,
      "aria-label": this.ariaLabel,
      "aria-labelledby": this.ariaLabelledby,
      "aria-hidden": this.ariaHidden,
      focusable: this.isFocusable.toString()
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
      ${className}Directive.titleIdCounter++;
      title.setAttribute("id", \`${iconName}-$\{${className}Directive.titleIdCounter}\`);
      svg.appendChild(title);
      svg.setAttribute("aria-labelledby", \`${iconName}-$\{${className}Directive.titleIdCounter}\`);
    }
	}
}

@NgModule({
  declarations: [
    ${className},
    ${className}Directive
  ],
  exports: [
    ${className},
    ${className}Directive
  ]
})
export class ${className}Module {}
`;

const iconStoryTemplate = icon => `.add("${icon.moduleName}", () => ({
  template: \`
    <p>Component <code>&lt;ibm-icon-${param(
      icon.moduleName
    )}&gt;&lt;/ibm-icon-${param(icon.moduleName)}&gt;</code></p>
    <ibm-icon-${param(icon.moduleName)}></ibm-icon-${param(icon.moduleName)}>
    <p>Directive <code>&lt;svg ibmIcon${pascal(
      icon.moduleName
    )}&gt;&lt;/svg&gt;</code></p>
    <svg ibmIcon${pascal(icon.moduleName)}></svg>
  \`
}))
.add("${icon.moduleName} with label", () => ({
  template: \`
    <ibm-icon-${param(
      icon.moduleName
    )} ariaLabel="label for the icon"></ibm-icon-${param(icon.moduleName)}>
    <svg ibmIcon${pascal(icon.moduleName)} ariaLabel="label for the icon"></svg>
  \`
}))
.add("${icon.moduleName} with title", () => ({
  template: \`
    <ibm-icon-${param(icon.moduleName)} title="icon title"></ibm-icon-${param(
  icon.moduleName
)}>
    <svg ibmIcon${pascal(icon.moduleName)} title="icon title"></svg>
  \`
}))
.add("${icon.moduleName} with class on the SVG", () => ({
  template: \`
    <ibm-icon-${param(
      icon.moduleName
    )} innerClass="test-class another-class"></ibm-icon-${param(
  icon.moduleName
)}>
    <svg ibmIcon${pascal(
      icon.moduleName
    )} class="test-class another-class"></svg>
  \`
}))`;

const gerateIconStories = icons => {
  let value = '';
  for (const icon of icons) {
    value += iconStoryTemplate(icon);
  }
  return value;
};

const generateStoryImports = icons => {
  let imports = '';
  for (const icon of icons) {
    imports += `import { ${
      icon.moduleName
    }Module } from "./../${icon.outputOptions.file.replace('es', 'lib')}"\n`;
  }
  return imports;
};

const storyTemplate = (basename, icons) => `
import { storiesOf, moduleMetadata } from "@storybook/angular";

${generateStoryImports(icons)}

storiesOf("${basename}", module)
  .addDecorator(moduleMetadata({
    imports: [ ${icons.map(i => `${i.moduleName}Module`).join(', ')} ],
  }))
  ${gerateIconStories(icons)};
`;

module.exports = {
  componentTemplate,
  storyTemplate,
};
