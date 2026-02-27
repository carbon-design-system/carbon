/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Called when the extension is activated (first command invocation).
 */
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('carbon.openPreview', () => {
      CarbonPreviewPanel.createOrShow(context.extensionUri);
    })
  );
  vscode.window.showInformationMessage('Activated.');
}

/**
 * Called when the extension is deactivated.
 */
export function deactivate() { }

/**
 * Manages the Carbon Component Preview webview panel.
 * Only one panel is allowed at a time — subsequent calls to createOrShow
 * will reveal the existing panel instead of creating a new one.
 */
class CarbonPreviewPanel {
  public static currentPanel: CarbonPreviewPanel | undefined;
  private static readonly viewType = 'carbonPreview';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If a panel already exists, reveal it
    if (CarbonPreviewPanel.currentPanel) {
      CarbonPreviewPanel.currentPanel._panel.reveal(column);
      return;
    }

    // Create a new panel
    const panel = vscode.window.createWebviewPanel(
      CarbonPreviewPanel.viewType,
      'Carbon Component Preview',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        // Allow the webview to load resources from the dist/webview directory
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'dist', 'webview'),
        ],
        // Retain the webview content when it becomes hidden
        retainContextWhenHidden: true,
      }
    );

    CarbonPreviewPanel.currentPanel = new CarbonPreviewPanel(
      panel,
      extensionUri
    );
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the initial HTML content
    this._update();

    // Listen for when the panel is disposed (user closes it)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message: { command: string; text?: string }) => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(message.text ?? 'Unknown error');
            return;
        }
      },
      null,
      this._disposables
    );
  }

  public dispose() {
    CarbonPreviewPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _update() {
    this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);
  }

  /**
   * Generates the HTML content for the webview.
   *
   * The webview loads the bundled React app from dist/webview/.
   * VS Code automatically injects --vscode-* CSS custom properties into
   * this document, which the Carbon vscode theme picks up via
   * var(--vscode-button-background, fallback).
   */
  private _getHtmlForWebview(webview: vscode.Webview): string {
    const webviewDistPath = vscode.Uri.joinPath(
      this._extensionUri,
      'dist',
      'webview'
    );

    // Read the built index.html and rewrite asset paths to use webview URIs
    const indexHtmlPath = path.join(
      this._extensionUri.fsPath,
      'dist',
      'webview',
      'index.html'
    );

    if (!fs.existsSync(indexHtmlPath)) {
      return this._getNotBuiltHtml();
    }

    const cspSource = webview.cspSource;
    const assetsUri = webview
      .asWebviewUri(vscode.Uri.joinPath(webviewDistPath, 'assets'))
      .toString();

    let html = fs.readFileSync(indexHtmlPath, 'utf8');

    // Inject the CSP source into the template placeholder
    html = html.replace(/\$\{cspSource\}/g, cspSource);

    // Rewrite Vite's ./assets/ paths to VS Code webview resource URIs.
    // With base: './' in vite.webview.config.ts, Vite outputs relative paths
    // like ./assets/index.js — these must be converted to vscode-webview://
    // URIs for the webview to load them.
    html = html.replace(
      /(src|href)="\.\/assets\//g,
      (_, attr) => `${attr}="${assetsUri}/`
    );

    return html;
  }

  /**
   * Shown when the webview app hasn't been built yet.
   */
  private _getNotBuiltHtml(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carbon Component Preview</title>
  <style>
    body {
      font-family: var(--vscode-font-family);
      font-size: var(--vscode-font-size);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      flex-direction: column;
      gap: 16px;
    }
    code {
      font-family: var(--vscode-editor-font-family);
      background: var(--vscode-textCodeBlock-background);
      padding: 2px 6px;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <p>The Carbon Preview webview app has not been built yet.</p>
  <p>Run <code>yarn build</code> in <code>packages/vscode-preview</code> to build it.</p>
</body>
</html>`;
  }
}

// Made with Bob
