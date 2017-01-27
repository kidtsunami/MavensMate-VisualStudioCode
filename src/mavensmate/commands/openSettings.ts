import { ClientCommand } from './clientCommand';
import { BaseCommand } from './baseCommand';

class OpenSettings extends ClientCommand {
    static create(): BaseCommand {
        return new OpenSettings();
    }

    constructor() {
        super('Open Settings', 'open-settings');
        this.async = false;
        this.body.args.ui = true;
        this.allowWithoutProject = true;
    }
}

export = OpenSettings;