export class LogPublisherConfig {
    loggerName: string = "";
    loggerLocation: string = "";
    isActive: string = "";

    constructor(loggerName: string, loggerLocation: string, isActive: string) {
        this.loggerName = loggerName;
        this.loggerLocation = loggerLocation;
        this.isActive = isActive;
    }
}