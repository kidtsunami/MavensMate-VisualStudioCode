import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import MavensMateExtension from '../src/mavensMateExtension';

suite("Extension", () => {
    let baseExtension: vscode.Extension<any>;
    
    setup(() => {
        baseExtension = vscode.extensions.getExtension("DavidHelmer.mavensmate");
    });
    
    test("exists", () => {
        assert.notEqual(undefined, baseExtension);
    });
});