import * as sinon from 'sinon';
import * as expect from 'expect.js';

import * as vscode from 'vscode';

import { BaseCommand } from '../../../src/mavensmate/commands/baseCommand';
import MockCommand from './mockCommand';
import { ProjectSettings } from '../../../src/mavensmate/projectSettings';

suite('Base Command', () => {
    let baseCommand: BaseCommand;

    setup(instantiateBaseCommand);

    function instantiateBaseCommand(){
        baseCommand = new MockCommand('base');
    }

    suite('invoke', () => {
        let hasProjectSettingsStub: sinon.SinonStub;
        let executeSpy: sinon.SinonSpy;

        suite('with project settings', () => {
            setup(() => {
                hasProjectSettingsStub = sinon.stub(ProjectSettings, 'hasProjectSettings')
                    .returns(true);
                executeSpy = sinon.spy(baseCommand, 'execute');
            });

            teardown(() => {
                hasProjectSettingsStub.restore();
            });

            suite('allowing without project', () => {
                setup(() => {
                    baseCommand.allowWithoutProject = true;
                });

                test('executes with selectedResource', executesWithSelectedResource);
                test('executes without selectedResource', executesWithoutSelectedResource);
            });

            function executesWithSelectedResource(){
                let selectedResource: vscode.Uri = vscode.Uri.file('a/file/path');

                return baseCommand.execute(selectedResource)
                    .then(() => {
                        expect(executeSpy.calledOnce);
                        expect(executeSpy.calledWithExactly(selectedResource));
                    });
            }

            function executesWithoutSelectedResource(){
                return baseCommand.execute()
                    .then(() => {
                        expect(executeSpy.calledOnce);
                        expect(executeSpy.calledWithExactly(undefined));
                    });
            }

            suite('not allowing without project', () => {
                setup(() => {
                    baseCommand.allowWithoutProject = false;
                });

                test('executes with selectedResource', executesWithSelectedResource);
                test('executes without selectedResource', executesWithoutSelectedResource);
            });
        });

        suite('without project settings', () => {
            suite('allowing without project', () => {
                test('prompts to open project', () => {

                });
            });

            suite('not allowing without project', () => {
                test('prompts to open project', () => {

                });
            });
        });
    });

});