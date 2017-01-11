import * as vscode from 'vscode';
import MavensMateExtension from './mavensMateExtension';

let mavensMateExtension: MavensMateExtension;

export function activate(context: vscode.ExtensionContext): any {
    mavensMateExtension = MavensMateExtension.create(context);
    console.info('activating!!!!');
    return mavensMateExtension.activate(context);
}

export function deactivate() {
    mavensMateExtension.deactivate();
    mavensMateExtension = null;
}

process.on("unhandledRejection", function(reason, promise) {
    console.error(`MavensMate Unhandled Exception: ${reason}`);
});