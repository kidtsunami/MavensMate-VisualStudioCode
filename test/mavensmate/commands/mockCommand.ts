import { BaseCommand } from '../../../src/mavensmate/commands/baseCommand';
import * as vscode from 'vscode';

class MockCommand extends BaseCommand {
    constructor(label: string) {
        super(label);
    }

    execute(selectedResource?: vscode.Uri): Thenable<any>{
        console.log('MockCommand',selectedResource);
        return Promise.resolve();
    }
}

export default MockCommand;