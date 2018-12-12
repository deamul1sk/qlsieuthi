export class SsoAuthenticatedInfoRequestDTO {
    code: string;
    sessionState: string;

    constructor(code: string, sessionState: string) {
        this.code = code;
        this.sessionState = sessionState;
    }
}