/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { param, pascal } = require('change-case');

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
  ${icons.reduce((string, icon) => (string += iconStoryTemplate(icon)), '')};
`;

module.exports = {
  storyTemplate,
};
