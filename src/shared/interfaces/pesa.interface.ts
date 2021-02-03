/** Format for output Response payload*/
export interface Res {
    output_ResponseCode: string;
    output_ResponseDesc: string;
    output_SessionID: string;
}

/** Customer to business (C2B) */
export interface c2b {
    input_Amount: number;
    input_Country: 'TZN';
    input_Currency: 'TZS';
    input_CustomerMSISDN: number | string;
    input_ServiceProviderCode: number | string;
    input_ThirdPartyConversationID: string;
    input_TransactionReference: string;
    input_PurchasedItemsDesc: string;
}

/** Payment Reversals  */
export interface reversal {
    input_ReversalAmount: string;
    input_TransactionID: string;
    input_Country: 'TZN';
    input_ServiceProviderCode: number | string;
    input_ThirdPartyConversationID: string;
}

/** Business to Customer (B2C) */
export interface b2c {
    input_Amount: number;
    input_Country: 'TZN';
    input_Currency: 'TZS';
    input_CustomerMSISDN: number | string;
    input_ServiceProviderCode: number | string;
    input_ThirdPartyConversationID: string;
    input_TransactionReference: string;
    input_PurchasedItemsDesc: string;
}

/** Business to Business (B2B) */
export interface b2b {
    input_Amount: number;
    input_Country: 'TZN';
    input_Currency: 'TZS';
    input_PrimaryPartyCode: string;
    input_ReceiverPartyCode: string;
    input_ThirdPartyConversationID: string;
    input_TransactionReference: string;
    input_PurchasedItemsDesc: string;
}

/** Query Transaction Status */
export interface query {
    input_QueryReference: string;
    input_ServiceProviderCode: number | string;
    input_ThirdPartyConversationID: string;
    input_Country: 'TZN';
}

/** Direct Debit Creation and Payment */
export interface ddc {
    input_AgreedTC: number;
    input_Country: 'TZN';
    input_CustomerMSISDN: number | string;
    input_EndRangeOfDays: number;
    input_ExpiryDate: number;
    input_FirstPaymentDate: number;
    input_Frequency: number;
    input_ServiceProviderCode: number | string;
    input_StartRangeOfDays: number;
    input_ThirdPartyConversationID: string;
    input_ThirdPartyReference: string;
}

/** Direct Debit Payments */
export interface ddp {
    input_Amount: number;
    input_Country: 'TNZ';
    input_Currency: 'TZS';
    input_CustomerMSISDN: number | string;
    input_ServiceProviderCode: number | string;
    input_ThirdPartyConversationID: string;
    input_ThirdPartyReference: string;
}
