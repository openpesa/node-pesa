import axios from 'axios';
import * as constants from 'constants';
import * as crypto from 'crypto';
import { IPesaOptions } from '../shared/interfaces/IPesaOptions.interface';
import { b2b, b2c, c2b, ddc, ddp, query, Res, reversal } from '../shared/interfaces/pesa.interface';

/**
 * Pesa
 * @package openpesaa/pesa-js
 * @class Pesa
 */
export class Pesa {
    private BASE_DOMAIN = 'https://openapi.m-pesa.com/';
    private AUTH_URL = 'ipg/v2/vodacomTZN/getSession/';
    private TRANSACTION_ROUTES = {
        b2c: 'ipg/v2/vodacomTZN/b2cPayment/singleStage/',
        c2b: 'ipg/v2/vodacomTZN/c2bPayment/singleStage/',
        ddc: 'ipg/v2/vodacomTZN/directDebitCreation/',
        ddp: 'ipg/v2/vodacomTZN/directDebitPayment/',
        query: 'ipg/v2/vodacomTZN/queryTransactionStatus/',
        rt: 'ipg/v2/vodacomTZN/reversal/',
    };
    private baseURL: string;
    private options: IPesaOptions;

    /**
     * @constructor
     * @param {IPesaOptions} options
     * @param environment
     *
     */
    constructor(options: IPesaOptions, environment: 'production' | 'sandbox') {
        if (environment === 'production') {
            this.baseURL = this.BASE_DOMAIN + 'openapi/';
        } else {
            this.baseURL = this.BASE_DOMAIN + 'sandbox/';
        }
        this.options = options;
    }

    /**
     * getSessionId
     */
    public getSessionId(): string | null {
        return this.options.sessionId ?? null;
    }

    /**
     * setSessionId
     */
    public setSessionId(sessId: string): void {
        this.options.sessionId = sessId;
    }

    /**
     * Generate the Session Key
     *
     * Before you can integrate on the M-Pesa OpenAPI solution, you must exchange your Application Key for a Session Key. The API Key is created with the creation of a new application. The Session Key acts as an access token that authorises the rest of your REST API calls to the system. A valid Session Key is needed to transact on M-Pesa using OpenAPI.
     *
     * @see {@link https://openapiportal.m-pesa.com/api-documentation#GeneratingtheSessionKey}
     * @returns {Promise}
     */
    public async get_session(): Promise<Res> {
        const response = await axios({
            method: 'get',
            url: this.baseURL + this.AUTH_URL,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(this.options.api_key),
            },
        });
        return response.data;
    }
    /**
     *
     * Encrypting the API Key
     *
     * To generate your Session Key for the sandbox and live environments:
     * 1.    Log into OpenAPI with a developer account
     * 2.    On the APPLICATION page, click Create New Application. Creating an application will generate your unique API Application Key needed to authorise and authenticate your application on the server
     * 3.    Type your name and version number for the application and select the products you wish to use. (The application can be configured any time). Save your new application.
     * 4.    Copy and save the API Key.
     * 5.    Copy the Public Key from the below section.
     * 6.    Generate a decoded Base64 string from the Public Key
     * 7.    Generate an instance of an RSA cipher and use the Base 64 string as the input
     * 8.    Encode the API Key with the RSA cipher and digest as Base64 string format
     * 9.    The result is your encrypted API Key.
     *
     *
     * @see {@link https://openapiportal.m-pesa.com/api-documentation#GeneratingtheSessionKey }
     * @see {@link https://nodejs.org/api/crypto.html#crypto_crypto_createpublickey_key }
     *
     * @param {string} key
     * @return {string}
     */
    public encrypt_key(key: string): string {
        const pk = '-----BEGIN PUBLIC KEY-----\n' + this.options.public_key + '\n' + '-----END PUBLIC KEY-----';
        return crypto
            .publicEncrypt({ key: pk, padding: constants.RSA_PKCS1_PADDING }, Buffer.from(key))
            .toString('base64');
    }
    /**
     * The Query Transaction Status
     * @name query
     * @function
     * @description The Query Transaction Status API call is used to query the status of the transaction that has been initiated.
     * @param {query} data
     * @returns {Promise}
     */
    public async query(data: query, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.query,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_QueryReference: data.input_QueryReference,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_Country: data.input_Country,
            },
        });
        return response.data;
    }
    /**
     * Customer to business (C2B)
     * @function c2b
     * @description The C2B API call is used as a standard customer-to-business transaction. Funds from the customer’s mobile money wallet will be deducted and be transferred to the mobile money wallet of the business. To authenticate and authorize this transaction, M-Pesa Payments Gateway will initiate a USSD Push message to the customer to gather and verify the mobile money PIN number. This number is not stored and is used only to authorize the transaction.
     * @api
     * @param {c2b} data
     *
     * @returns {Promise} Promise

     */
    public async c2b(data: c2b, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_TransactionReference: data.input_TransactionReference,
                input_PurchasedItemsDesc: data.input_PurchasedItemsDesc,
            },
        });

        return response.data;
    }
    /**
     * Business to Customer (B2C)
     *
     * The B2C API Call is used as a standard business-to-customer funds disbursement. Funds from the business account’s wallet will be deducted and paid to the mobile money wallet of the customer. Use cases for the B2C includes:
     *  -    Salary payments
     *  -    Funds transfers from business
     *  -    Charity pay-out
     *
     * @api
     * @param {b2c} data

     * @returns {Promise} Promise
     */
    public async b2c(data: b2c, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_TransactionReference: data.input_TransactionReference,
                input_PurchasedItemsDesc: data.input_PurchasedItemsDesc,
            },
        });
        return response.data;
    }
    /**
     * Business to business (B2B)
     *
     * The B2B API Call is used for business-to-business transactions. Funds from the business’ mobile money wallet will be deducted and transferred to the mobile money wallet of the other business. Use cases for the B2C includes:
     *  -  Stock purchases
     *  -  Bill payment
     *  -  Ad-hoc payment
     *
     * @api
     * @param data
     *
     * @returns {Promise} Promise
     */
    public async b2b(data: b2b, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }

        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_PrimaryPartyCode: data.input_PrimaryPartyCode,
                input_ReceiverPartyCode: data.input_ReceiverPartyCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_TransactionReference: data.input_TransactionReference,
                input_PurchasedItemsDesc: data.input_PurchasedItemsDesc,
            },
        });
        return response.data;
    }
    /**
     * Payment reversals
     *
     * The Reversal API is used to reverse a successful transaction. Using the Transaction ID of a previously successful transaction,  the OpenAPI will withdraw the funds from the recipient party’s mobile money wallet and revert the funds to the mobile money wallet of the initiating party of the original transaction.
     *
     * @api
     * @param data
     *
     * @returns {Promise} Promise
     *
     */
    public async reverse(data: reversal, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }
        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.c2b,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_ReversalAmount: data.input_ReversalAmount,
                input_TransactionID: data.input_TransactionID,
                input_Country: data.input_Country,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
            },
        });
        return response.data;
    }
    /**
     *
     * Direct Debit Create Mandate
     *
     *
     * Direct Debits are payments in M-Pesa that are initiated by the Payee alone without any Payer interaction, but permission must first be granted by the Payer. The granted permission from the Payer to Payee is commonly termed a ‘Mandate’, and M-Pesa must hold details of this Mandate.
     * The Direct Debit API set allows an organisation to get the initial consent of their customers to create the Mandate that allows the organisation to debit customer's account at an agreed frequency and amount for services rendered. After the initial consent, the debit of the account will not involve any customer interaction. The Direct Debit feature makes use of the following API calls:
     * •    Create a Direct Debit mandate
     * •    Pay a mandate
     * The customer is able to view and cancel the Direct Debit mandate from G2 menu accessible via USSD menu or the Smartphone Application.
     * @api
     * @param data
     *
     *
     *
     * @returns {Promise} Promise
     */
    public async debit_create(data: ddc, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }

        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.ddc,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_AgreedTC: data.input_AgreedTC,
                input_Country: data.input_Country,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_EndRangeOfDays: data.input_EndRangeOfDays,
                input_ExpiryDate: data.input_ExpiryDate,
                input_FirstPaymentDate: data.input_FirstPaymentDate,
                input_Frequency: data.input_Frequency,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_StartRangeOfDays: data.input_StartRangeOfDays,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_ThirdPartyReference: data.input_ThirdPartyReference,
            },
        });
        return response.data;
    }
    /**
     * Direct Debit Payment
     *
     * Direct Debits are payments in M-Pesa that are initiated by the Payee alone without any Payer interaction, but permission must first be granted by the Payer. The granted permission from the Payer to Payee is commonly termed a ‘Mandate’, and M-Pesa must hold details of this Mandate.
     * The Direct Debit API set allows an organisation to get the initial consent of their customers to create the Mandate that allows the organisation to debit customer's account at an agreed frequency and amount for services rendered. After the initial consent, the debit of the account will not involve any customer interaction. The Direct Debit feature makes use of the following API calls:
     * •    Create a Direct Debit mandate
     * •    Pay a mandate
     * The customer is able to view and cancel the Direct Debit mandate from G2 menu accessible via USSD menu or the Smartphone Application.
     *
     * @api

     * @param data

     * @returns {Promise} Promise
     */
    public async debit_payment(data: ddp, sessionID: string | null): Promise<Res> {
        let output_SessionID = '';
        if (sessionID == null) {
            const res = await this.get_session();
            output_SessionID = res.output_SessionID;
        }

        const response = await axios({
            method: 'post',
            url: this.baseURL + this.TRANSACTION_ROUTES.ddp,
            headers: {
                Accept: 'application/json',
                Origin: '*',
                Authorization: 'Bearer ' + this.encrypt_key(output_SessionID),
            },
            data: {
                input_Amount: data.input_Amount,
                input_Country: data.input_Country,
                input_Currency: data.input_Currency,
                input_CustomerMSISDN: data.input_CustomerMSISDN,
                input_ServiceProviderCode: data.input_ServiceProviderCode,
                input_ThirdPartyConversationID: data.input_ThirdPartyConversationID,
                input_ThirdPartyReference: data.input_ThirdPartyReference,
            },
        });
        return response.data;
    }
}
