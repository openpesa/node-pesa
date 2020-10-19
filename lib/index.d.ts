import { AxiosInstance } from 'axios';
import RSA from 'jsencrypt';
interface IForodhaOptions {
    auth_url?: string;
    api_key: string;
    public_key: string;
    client_options?: string[];
}
interface ITransactionData {
    encryptSessionKey: boolean;
    name: string;
    rules: any;
    url: string;
}
interface ITransactionType {
    b2c: ITransactionData;
    c2b: ITransactionData;
    rt: ITransactionData;
    ddc: ITransactionData;
    ddp: ITransactionData;
    query: ITransactionData;
}
/**
 * Forodha
 */
export declare class Forodha {
    protected BASE_DOMAIN: string;
    protected AUTH_URL: string;
    protected TRANSACT_TYPE: ITransactionType;
    private client;
    private rsa;
    private options;
    constructor(options: IForodhaOptions, client?: AxiosInstance, rsa?: RSA);
    /**
     * Get Session Key
     * @return mixed
     * @throws GuzzleException
     */
    get_session(): void;
    /**
     * Encrypts a key
     * @param key
     * @return string
     */
    encrypt_key(key: string | void): string;
    /**
     * Query the status of the transaction that has been initiated.
     *
     * @param data mixed
     * @param session null|mixed
     * @return mixed
     * @throws GuzzleException
     */
    query(data: {}, session?: string): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Perform a transaction
     *
     * @param type string
     * @param data mixed
     * @param session null|string
     * @return mixed
     * @throws GuzzleException
     */
    transact(type: string, data: {}, session?: string): Promise<import("axios").AxiosResponse<any>>;
}
export {};
