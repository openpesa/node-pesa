export interface IPesaOptions {
    market?: 'TZN';
    currency?: 'TZS';

    api_key: string;
    public_key?: string;

    sessionId?: string | null;

    client_options?: Array<string>;
}
