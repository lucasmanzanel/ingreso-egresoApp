export interface ErrorI {
    error: ErrorIError;
}

export interface ErrorIError {
    code:    number;
    message: string;
    errors:  ErrorElement[];
}

export interface ErrorElement {
    message: string;
    domain:  string;
    reason:  string;
}
