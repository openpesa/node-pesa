export declare class Fixture {
    static enviroment: string;
    static apiKey: string;
    static publicKey: string;
    static authUrl: string;
    static data_c2b: {
        input_Amount: number;
        input_Country: string;
        input_Currency: string;
        input_CustomerMSISDN: string;
        input_ServiceProviderCode: string;
        input_ThirdPartyConversationID: string;
        input_TransactionReference: string;
        input_PurchasedItemsDesc: string;
    };
    static data_reversal: {
        input_ReversalAmount: number;
        input_TransactionID: string;
        input_Country: string;
        input_ServiceProviderCode: string;
        input_ThirdPartyConversationID: string;
    };
    static data_b2c: {
        input_Amount: number;
        input_Country: string;
        input_Currency: string;
        input_CustomerMSISDN: string;
        input_ServiceProviderCode: string;
        input_ThirdPartyConversationID: string;
        input_TransactionReference: string;
        input_PurchasedItemsDesc: string;
    };
    static data_query: {
        input_QueryReference: string;
        input_ServiceProviderCode: string;
        input_ThirdPartyConversationID: string;
        input_Country: string;
    };
    static data_ddc: {
        input_AgreedTC: string;
        input_Country: string;
        input_CustomerMSISDN: string;
        input_EndRangeOfDays: string;
        input_ExpiryDate: string;
        input_FirstPaymentDate: string;
        input_Frequency: string;
        input_ServiceProviderCode: string;
        input_StartRangeOfDays: string;
        input_ThirdPartyConversationID: string;
        input_ThirdPartyReference: string;
    };
    static data_ddp: {
        input_Amount: string;
        input_Country: string;
        input_Currency: string;
        input_CustomerMSISDN: string;
        input_ServiceProviderCode: string;
        input_ThirdPartyConversationID: string;
        input_ThirdPartyReference: string;
    };
}
