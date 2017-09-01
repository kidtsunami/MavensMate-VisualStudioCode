import { PathsCommand } from './pathsCommand';
import { BaseCommand } from './baseCommand';
import { MavensMateChannel } from '../../vscode/mavensMateChannel';
import { MavensMateCodeCoverage } from '../../vscode/mavensMateCodeCoverage';

import * as vscode from 'vscode';
import path = require('path');
import Promise = require('bluebird');

module.exports = class HideCoverage extends PathsCommand {
    mavensMateCodeCoverage: MavensMateCodeCoverage;
    static create() {
        return new HideCoverage();
    }

    constructor() {
        super('Hide Apex Code Coverage', 'hide-coverage')
        this.mavensMateCodeCoverage = MavensMateCodeCoverage.getInstance();
    }

    protected confirmPath(): Thenable<any> {
        if (this.filePath.indexOf('apex-scripts') === -1) {
            return super.confirmPath();
        } else {
            return Promise.reject(`Local Apex Scripts aren't covered by tests`);
        }
    }

    onSuccess(response): Promise<any> {
        return super.onSuccess(response)
            .then(() => this.handleCoverageResponse(response));
    }

    private handleCoverageResponse(response) {
        if (response.result && response.result != []) {
            let options: vscode.DecorationRenderOptions = {
                isWholeLine: true,
                backgroundColor: 'rgba(0, 0, 0, 0.0)'
            };
            var decoration: vscode.TextEditorDecorationType  = vscode.window.createTextEditorDecorationType(options);
        } else {
            let message = `No Apex Code Coverage Available: ${this.baseName} (${this.filePath})`;
            this.mavensMateChannel.appendLine(message);
            vscode.window.showWarningMessage(message);
        }
    }
}
