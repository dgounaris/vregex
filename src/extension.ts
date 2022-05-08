// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { isNull } from 'util';
import * as vscode from 'vscode';
import RandExp = require('randexp');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vregex" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vregex.randomMatchingExpression', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const activeSelection = vscode.window.activeTextEditor?.selection;
		if (activeSelection === null) {
			return;
		}
		const activeSelectionText = vscode.window.activeTextEditor?.document.getText(
			new vscode.Range(activeSelection!.start, activeSelection!.end)
		);
		if (activeSelectionText === null) {
			return;
		}
		const randExp = new RandExp(activeSelectionText!);
		randExp.max = 10;
		const matchingExpression = randExp.gen();
		vscode.window.showInformationMessage('Matching expression: "' + matchingExpression + '"');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
