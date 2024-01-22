/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path';
import ts from 'typescript';

const tsConfigFile = path.join(__dirname, 'tsconfig.base.json');

export const diagnosticToMessage = (diagnostic: ts.Diagnostic) => {
  const { file, messageText } = diagnostic;
  const filePrefix = file ? `${file.fileName}: ` : '';
  const text = ts.flattenDiagnosticMessageText(messageText, '\n');
  return `${filePrefix}${text}`;
};

export const loadTsCompilerOpts = (path: string) => {
  const { config, error } = ts.readConfigFile(path, ts.sys.readFile);
  if (error) {
    throw new Error(diagnosticToMessage(error));
  }
  const opts = ts.convertCompilerOptionsFromJson(config.compilerOptions, '');
  const { errors } = opts;
  if (errors.length > 0) {
    errors.forEach((diagnostic) => {
      console.log(diagnosticToMessage(diagnostic));
    });
    throw new Error('Base TypeScript config file errors found');
  }
  return opts.options;
};

export const loadBaseTsCompilerOpts = () => {
  return loadTsCompilerOpts(tsConfigFile);
};
