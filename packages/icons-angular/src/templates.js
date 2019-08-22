/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { param, pascal } = require('change-case');
const { basename } = require('path');

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

const publicApiExport = (iconName, className) => `
export { ${className}, ${className}Directive, ${className}Module } from "./${iconName}";
`;

const publicApi = icons =>
  icons.reduce(
    (str, icon) =>
      str +
      publicApiExport(
        basename(icon.outputOptions.file, '.ts'),
        icon.moduleName
      ),
    ''
  );

const rootPublicApi = baseNames =>
  baseNames.reduce(
    (str, name) => `
  ${str}
  export * from "@carbon/icons-angular/${name}";
`,
    ''
  );

const formatBazelDeps = baseNames =>
  baseNames.reduce(
    (names, name) => `
    ${names}
    "//ts/${name}:${param(name)}",
  `,
    ''
  );

const formatBazelGlobals = baseNames =>
  baseNames.reduce(
    (names, name) => `
    ${names}
    "@carbon/icons-angular/${name}": "carbon.iconsAngular.${name
      .split('/')
      .join('.')}",
  `,
    ''
  );

const rootBuildBazel = baseNames => `
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
        ${formatBazelDeps(baseNames)}
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
        ${formatBazelGlobals(baseNames)}
        "@carbon/icon-helpers": "carbon.iconHelpers"
    },
    deps = [
        ${formatBazelDeps(baseNames)}
        ":icons-angular"
    ]
)`;

const iconBuildBazel = name => `
load("@npm_angular_bazel//:index.bzl", "ng_module")

ng_module(
    name = "${param(name)}",
    srcs = glob(
        ["**/*.ts"]
    ),
    # There is currently a problem with this which will be fixed by https://github.com/angular/angular/pull/32185
    bundle_dts = False,
    visibility = ["//visibility:public"],
    tsconfig = "//ts:tsconfig-build.json",
    module_name = "@carbon/icons-angular/${name}",
    flat_module_out_file = "${param(name)}",
    deps = [
        "//ts:typings",
        "@npm//@angular/core",
        "@npm//tslib",
        "@npm//rxjs"
    ],
)
`;

module.exports = {
  componentTemplate,
  rootBuildBazel,
  iconBuildBazel,
  publicApi,
  rootPublicApi,
};
