import { PathsCommand } from './pathsCommand';

module.exports = class OpenMetadata extends PathsCommand {
    static create(){
        return new OpenMetadata();
    }

    constructor() {
        super('Open Metadata', 'open-metadata');
        this.async = false;
        this.body.callThrough = true;
        this.body.args.ui = false;
    }
}