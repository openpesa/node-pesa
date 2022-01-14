export interface IPesaOptions {
    market?: 'TZN' | string;
    currency?: 'TZS' | string;
    api_key: string;
    public_key?: string;
    sessionId?: string | null;
    client_options?: Array<string>;
}
