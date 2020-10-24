import axios, { AxiosInstance } from 'axios';
// @ts-ignore
import * as RSA from 'node-rsa';

// todo: move interfaces to another file
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
export class Forodha {
    protected BASE_DOMAIN: string = 'https://openapi.m-pesa.com/sandbox/';

    protected AUTH_URL: string = this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/getSession';

    protected TRANSACT_TYPE: ITransactionType = {
        b2c: {
            encryptSessionKey: true,
            name: 'Business 2 Consumer',
            rules: {},
            url: this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/b2cPayment/singleStage/',
        },
        c2b: {
            encryptSessionKey: true,
            name: 'Consumer 2 Business',
            rules: {},
            url: this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/c2bPayment/singleStage/',
        },
        ddc: {
            encryptSessionKey: true,
            name: 'Direct Debits create',
            rules: {},
            url: this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/directDebitCreation/',
        },
        ddp: {
            encryptSessionKey: false,
            name: 'Direct Debits payment',
            rules: {},
            url: this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/directDebitPayment/',
        },
        query: {
            encryptSessionKey: true,
            name: 'Query Transaction Status',
            rules: {},
            url: this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/queryTransactionStatus/',
        },
        rt: {
            encryptSessionKey: true,
            name: 'Reverse Transaction',
            rules: {},
            url: this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/reversal/',
        },
    };

    private client: AxiosInstance;
    private rsa: RSA;
    private options: IForodhaOptions;

    constructor(options: IForodhaOptions, client?: AxiosInstance, rsa?: RSA) {
        this.options = options;
        this.client = client
            ? client
            : axios.create({
                  headers: { Accept: 'application/json', Origin: '*', ...this.options.client_options },
                  timeout: 3 * 1000,
              });
        this.rsa = rsa ? rsa : new RSA();
        this.rsa.setOptions({ encryptionScheme: 'pkcs1' });
    }

    /**
     * Get Session Key
     * @return mixed
     * @throws GuzzleException
     */
    public async get_session() {
        const token = this.encrypt_key(this.options.api_key);

        // fixme: must always return a string ,must never return void
        const res = await this.client.get(this.AUTH_URL, { headers: { Authorization: `Bearer ${token}` } });
        return res.data;
    }

    /**
     * Encrypts a key
     *
     * 'private' or 'pkcs1' or 'pkcs1-private' == 'pkcs1-private-pem' — private key encoded in pcks1 scheme as pem string.
     * 'public' or 'pkcs8-public' == 'pkcs8-public-pem' — public key encoded in pcks8 scheme as pem string.
     *
     * @param key
     * @return string
     */
    public encrypt_key(key: string): string {
        this.rsa.importKey(this.options.public_key, 'public');

        return this.rsa.encrypt(key, 'base64', 'utf8');
    }

    /**
     * Query the status of the transaction that has been initiated.
     *
     * @param data mixed
     * @param session null|mixed
     * @return mixed
     * @throws GuzzleException
     */
    public async query(data: {}, session?: string) {
        const token: string = session ?? (await this.get_session());
        return this.client.get(this.TRANSACT_TYPE.query.url, {
            headers: { Authorization: `Bearer ${this.encrypt_key(token)}` },
        });
    }

    /**
     * Perform a transaction
     *
     * @param type string
     * @param data mixed
     * @param session null|string
     * @return mixed
     * @throws GuzzleException
     */
    public async transact(type: string, data: {}, session?: string) {
        // fixme: make a promise
        const sessionID: string = session ?? (await this.get_session());
        const token: string | void = this.TRANSACT_TYPE[type as keyof ITransactionType].encryptSessionKey
            ? this.encrypt_key(sessionID)
            : sessionID;

        return this.client.post(this.TRANSACT_TYPE[type as keyof ITransactionType].url, data, {
            headers: { Authorization: `Bearer ${token}"` },
        });
    }
}
