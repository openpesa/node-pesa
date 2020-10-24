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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forodha = void 0;
var axios_1 = require("axios");
// @ts-ignore
var RSA = require("node-rsa");
/**
 * Forodha
 */
var Forodha = /** @class */ (function () {
    function Forodha(options, client, rsa) {
        this.BASE_DOMAIN = 'https://openapi.m-pesa.com/sandbox/';
        this.AUTH_URL = this.BASE_DOMAIN + 'ipg/v2/vodacomTZN/getSession';
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
    Forodha.prototype.get_session = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.encrypt_key(this.options.api_key);
                        return [4 /*yield*/, this.client.get(this.AUTH_URL, { headers: { Authorization: "Bearer " + token } })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * Encrypts a key
     *
     * 'private' or 'pkcs1' or 'pkcs1-private' == 'pkcs1-private-pem' — private key encoded in pcks1 scheme as pem string.
     * 'public' or 'pkcs8-public' == 'pkcs8-public-pem' — public key encoded in pcks8 scheme as pem string.
     *
     * @param key
     * @return string
     */
    Forodha.prototype.encrypt_key = function (key) {
        this.rsa.importKey(this.options.public_key, 'public');
        return this.rsa.encrypt(key, 'base64', 'utf8');
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
        return __awaiter(this, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(session !== null && session !== void 0)) return [3 /*break*/, 1];
                        _a = session;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.get_session()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        token = _a;
                        return [2 /*return*/, this.client.get(this.TRANSACT_TYPE.query.url, {
                                headers: { Authorization: "Bearer " + this.encrypt_key(token) },
                            })];
                }
            });
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
        return __awaiter(this, void 0, void 0, function () {
            var sessionID, _a, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(session !== null && session !== void 0)) return [3 /*break*/, 1];
                        _a = session;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.get_session()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        sessionID = _a;
                        token = this.TRANSACT_TYPE[type].encryptSessionKey
                            ? this.encrypt_key(sessionID)
                            : sessionID;
                        return [2 /*return*/, this.client.post(this.TRANSACT_TYPE[type].url, data, {
                                headers: { Authorization: "Bearer " + token + "\"" },
                            })];
                }
            });
        });
    };
    return Forodha;
}());
exports.Forodha = Forodha;
