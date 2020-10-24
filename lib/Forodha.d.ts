import { AxiosInstance } from 'axios';
import * as RSA from 'node-rsa';
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
    get_session(): Promise<any>;
    /**
     * Encrypts a key
     *
     * 'private' or 'pkcs1' or 'pkcs1-private' == 'pkcs1-private-pem' — private key encoded in pcks1 scheme as pem string.
     * 'public' or 'pkcs8-public' == 'pkcs8-public-pem' — public key encoded in pcks8 scheme as pem string.
     *
     * @param key
     * @return string
     */
    encrypt_key(key: string): string;
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
