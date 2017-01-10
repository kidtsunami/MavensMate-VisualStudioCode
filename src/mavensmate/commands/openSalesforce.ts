import { ClientCommand } from './clientCommand';
import { BaseCommand } from './baseCommand';

module.exports = class OpenSalesforce extends ClientCommand {
    static create(): BaseCommand {
        return new OpenSalesforce();
    }

    constructor() {
        super('Open Salesforce', 'open-sfdc');
        this.async = false;
        this.body.args.ui = true;
    }
}