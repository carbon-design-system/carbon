'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.loadBaseTsCompilerOpts =
  exports.loadTsCompilerOpts =
  exports.diagnosticToMessage =
    void 0;
/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path_1 = __importDefault(require('path'));
const typescript_1 = __importDefault(require('typescript'));
const tsConfigFile = path_1.default.join(__dirname, 'tsconfig.base.json');
const diagnosticToMessage = (diagnostic) => {
  const { file, messageText } = diagnostic;
  const filePrefix = file ? `${file.fileName}: ` : '';
  const text = typescript_1.default.flattenDiagnosticMessageText(
    messageText,
    '\n'
  );
  return `${filePrefix}${text}`;
};
exports.diagnosticToMessage = diagnosticToMessage;
const loadTsCompilerOpts = (path) => {
  const { config, error } = typescript_1.default.readConfigFile(
    path,
    typescript_1.default.sys.readFile
  );
  if (error) {
    throw new Error((0, exports.diagnosticToMessage)(error));
  }
  const opts = typescript_1.default.convertCompilerOptionsFromJson(
    config.compilerOptions,
    ''
  );
  const { errors } = opts;
  if (errors.length > 0) {
    errors.forEach((diagnostic) => {
      console.log((0, exports.diagnosticToMessage)(diagnostic));
    });
    throw new Error('Base TypeScript config file errors found');
  }
  return opts.options;
};
exports.loadTsCompilerOpts = loadTsCompilerOpts;
const loadBaseTsCompilerOpts = () => {
  return (0, exports.loadTsCompilerOpts)(tsConfigFile);
};
exports.loadBaseTsCompilerOpts = loadBaseTsCompilerOpts;
