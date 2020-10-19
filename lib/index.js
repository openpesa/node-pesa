"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forodha = void 0;
var axios_1 = require("axios");
// @ts-ignore
var jsencrypt_1 = require("jsencrypt");
/**
 * Forodha
 */
var Forodha = /** @class */ (function () {
    function Forodha(options, client, rsa) {
        this.BASE_DOMAIN = 'https://openapi.m-pesa.com/sandbox/';
        this.AUTH_URL = this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/getSession/';
        this.TRANSACT_TYPE = {
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
        this.options = options;
        this.client = client
            ? client
            : axios_1.default.create({
                headers: __assign({ Accept: 'application/json', Origin: '*' }, this.options.client_options),
                timeout: 300,
            });
        this.rsa = rsa ? rsa : new jsencrypt_1.default();
    }
    /**
     * Get Session Key
     * @return mixed
     * @throws GuzzleException
     */
    Forodha.prototype.get_session = function () {
        var token = this.encrypt_key(this.options.api_key);
        // fixme: must always return a string ,must never return void
        this.client
            .get(this.AUTH_URL, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            // handle error
            return '';
        })
            .finally(function () {
            return '';
            // always executed
        });
    };
    /**
     * Encrypts a key
     * @param key
     * @return string
     */
    Forodha.prototype.encrypt_key = function (key) {
        this.rsa.setPublicKey(this.options.public_key);
        return Buffer.from(this.rsa.encrypt(key)).toString('base64');
    };
    /**
     * Query the status of the transaction that has been initiated.
     *
     * @param data mixed
     * @param session null|mixed
     * @return mixed
     * @throws GuzzleException
     */
    Forodha.prototype.query = function (data, session) {
        var token = session !== null && session !== void 0 ? session : this.get_session();
        // todo: missing request data
        return this.client.get(this.TRANSACT_TYPE.query.url, {
            headers: { Authorization: "Bearer " + this.encrypt_key(token) },
        });
    };
    /**
     * Perform a transaction
     *
     * @param type string
     * @param data mixed
     * @param session null|string
     * @return mixed
     * @throws GuzzleException
     */
    Forodha.prototype.transact = function (type, data, session) {
        // fixme: make a promise
        var sessionID = session !== null && session !== void 0 ? session : this.get_session();
        var token = this.TRANSACT_TYPE[type].encryptSessionKey
            ? this.encrypt_key(sessionID)
            : sessionID;
        return this.client.post(this.TRANSACT_TYPE[type].url, data, {
            headers: { Authorization: "Bearer " + token + "\"" },
        });
    };
    return Forodha;
}());
exports.Forodha = Forodha;
