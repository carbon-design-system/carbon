import ts from 'typescript';
export declare const diagnosticToMessage: (diagnostic: ts.Diagnostic) => string;
export declare const loadTsCompilerOpts: (path: string) => ts.CompilerOptions;
export declare const loadBaseTsCompilerOpts: () => ts.CompilerOptions;
