/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { param, pascal } = require('change-case');
const { toString } = require('@carbon/icon-helpers');

const classCase = str => {
  const pascalled = pascal(str);
  if (Number.isNaN(Number(pascalled[0]))) {
    return pascalled;
  }
  // append a _ if the string starts with a number
  return `_${pascalled}`;
};

const componentTemplate = icon => `
@Component({
	selector: "ibm-icon-${param(icon.moduleName)}",
  template: \`
    <svg
      ibmIcon${pascal(icon.moduleName)}
      [ariaLabel]="ariaLabel"
      [ariaLabelledby]="ariaLabelledby"
      [ariaHidden]="ariaHidden"
      [title]="title"
      [isFocusable]="focusable"
      [attr.class]="innerClass">
    </svg>
  \`
})
export class ${classCase(icon.moduleName)}Component {
  @Input() ariaLabel: string;
  @Input() ariaLabelledby: string;
  @Input() ariaHidden: boolean;
  @Input() title: string;
  @Input() focusable: boolean = false;
  @Input() innerClass: string;
}
`;

const directiveTemplate = icon => `
@Directive({
  selector: "[ibmIcon${pascal(icon.moduleName)}]"
})
export class ${classCase(icon.moduleName)}Directive implements AfterViewInit {
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
    const rawSVG = \`${toString(icon.descriptor)}\`;
    const svgElement = domParser.parseFromString(rawSVG, "image/svg+xml").documentElement;

    let node = svgElement.firstChild;
    while (node) {
      // importNode makes a clone of the node
      // this ensures we keep looping over the nodes in the parsed document
      svg.appendChild(svg.ownerDocument.importNode(node, true));
      node = node.nextSibling;
    }

    const attributes = getAttributes({
      width: ${icon.descriptor.attrs.width},
      height: ${icon.descriptor.attrs.height},
      viewBox: "${icon.descriptor.attrs.viewBox}",
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
      ${classCase(icon.moduleName)}Directive.titleIdCounter++;
      title.setAttribute("id", \`${param(icon.moduleName)}-$\{${classCase(
  icon.moduleName
)}Directive.titleIdCounter}\`);
      svg.appendChild(title);
      svg.setAttribute("aria-labelledby", \`${param(
        icon.moduleName
      )}-$\{${classCase(icon.moduleName)}Directive.titleIdCounter}\`);
    }
	}
}
`;

const formatModuleDeclarations = icons =>
  icons.reduce(
    (str, icon) => `
  ${str}
  ${classCase(icon.moduleName)}Component,
  ${classCase(icon.moduleName)}Directive,
`,
    ''
  );

const moduleTemplate = (namespace, icons) => `
import {
  NgModule,
  Component,
  Directive,
  ElementRef,
  Input,
  AfterViewInit
} from "@angular/core";
import { getAttributes } from "@carbon/icon-helpers";

${icons.reduce((str, icon) => `${str} ${componentTemplate(icon)}`, '')}

${icons.reduce((str, icon) => `${str} ${directiveTemplate(icon)}`, '')}

@NgModule({
  declarations: [
    ${formatModuleDeclarations(icons)}
  ],
  exports: [
    ${formatModuleDeclarations(icons)}
  ]
})
export class ${classCase(namespace)}Module {}
`;

const publicApiExport = icon => `
${classCase(icon.moduleName)}Component,
${classCase(icon.moduleName)}Directive,
`;

const publicApi = icons => `
export {
  ${icons.reduce((str, icon) => `${str} ${publicApiExport(icon)}`, '')}
  ${classCase(icons[0].namespace)}Module
} from "./${param(icons[0].namespace)}";
`;

const rootPublicApi = namespaces =>
  namespaces.reduce(
    (str, name) => `
  ${str}
  export * from "@carbon/icons-angular/${name}";
`,
    ''
  );

// const formatBazelDeps = namespaces =>
//   namespaces.reduce(
//     (names, name) => `
//     ${names}
//     "//ts/${name}:${param(name)}",
//   `,
//     ''
//   );

const formatBazelDeps = namespaces =>
  namespaces.reduce(
    (names, name) => `
    ${names}
    "//ts/${name}:index",
  `,
    ''
  );

const formatBazelGlobals = namespaces =>
  namespaces.reduce(
    (names, name) => `
    ${names}
    "@carbon/icons-angular/${name}": "carbon.iconsAngular.${name
      .split('/')
      .join('.')}",
  `,
    ''
  );

const rootBuildBazel = namespaces => `
package(default_visibility = ["//visibility:public"])

load("@npm_angular_bazel//:index.bzl", "ng_module", "ng_package")
load("@npm_bazel_typescript//:defs.bzl", "ts_library")

# Root "@carbon/icons-angular" entry-point.
ng_module(
    name = "icons-angular",
    srcs = glob(
        ["*.ts"]
    ),
    # There is currently a problem with this which will be fixed by https://github.com/angular/angular/pull/32185
    bundle_dts = False,
    tsconfig = ":tsconfig-build.json",
    module_name = "@carbon/icons-angular",
    flat_module_out_file = "icons-angular",
    deps = [
        ${formatBazelDeps(namespaces)}
        "@npm//@angular/core",
        "@npm//tslib",
        "@npm//rxjs",
    ],
)

ts_library(
    name = "typings",
    srcs = [":typings.d.ts"],
    tsconfig = "carbon_icons_angular/tsconfig.json"
)

# Creates the @carbon/icons-angular package published to npm.
ng_package(
    name = "npm_package",
    srcs = ["package.json"],
    entry_point = ":index.ts",
    entry_point_name = "icons-angular",
    globals = {
        "tslib": "tslib",
        "@angular/core": "ng.core",
        ${formatBazelGlobals(namespaces)}
        "@carbon/icon-helpers": "carbon.iconHelpers"
    },
    deps = [
        ${formatBazelDeps(namespaces)}
        ":icons-angular"
    ]
)`;

// const iconBuildBazel = name => `
// load("@npm_angular_bazel//:index.bzl", "ng_module")

// ng_module(
//     name = "${param(name)}",
//     srcs = glob(
//         ["**/*.ts"]
//     ),
//     # There is currently a problem with this which will be fixed by https://github.com/angular/angular/pull/32185
//     bundle_dts = False,
//     visibility = ["//visibility:public"],
//     tsconfig = "//ts:tsconfig-build.json",
//     module_name = "@carbon/icons-angular/${name}",
//     flat_module_out_file = "${param(name)}",
//     deps = [
//         "//ts:typings",
//         "@npm//@angular/core",
//         "@npm//tslib",
//         "@npm//rxjs"
//     ],
// )
// `;

const iconBuildBazel = name => `
load("@npm_angular_bazel//:index.bzl", "ng_module")

ng_module(
    name = "index",
    srcs = glob(
        ["**/*.ts"]
    ),
    # There is currently a problem with this which will be fixed by https://github.com/angular/angular/pull/32185
    bundle_dts = False,
    visibility = ["//visibility:public"],
    tsconfig = "//ts:tsconfig-build.json",
    module_name = "@carbon/icons-angular/${name}",
    deps = [
        "//ts:typings",
        "@npm//@angular/core",
        "@npm//tslib",
        "@npm//rxjs"
    ],
)
`;

module.exports = {
  moduleTemplate,
  rootBuildBazel,
  iconBuildBazel,
  publicApi,
  rootPublicApi,
};
