const { Pesa } = require('@openpesa/pesa-js');
const dotenv = require('dotenv');

dotenv.config();

let environment = process.env.ENV;
let publicKey = process.env.PUBLIC_KEY;
let apiKey = process.env.API_KEY;

let pesa = new Pesa(
    {
        api_key: apiKey,
        public_key: publicKey,
    },
    environment,
);

let data = {
    input_Amount: 12000,
    input_CustomerMSISDN: '000000000001',
    input_Country: 'TZN',
    input_Currency: 'TZS',
    input_ServiceProviderCode: '000000',
    input_TransactionReference: 'T12347Z',
    input_ThirdPartyConversationID: '4e9b774d1da34af78412a598cbc28f5d',
    input_PurchasedItemsDesc: 'Test Three Item',
};

pesa.c2b(data)
    .then((data) => {
        console.log(data);
    })
    .catch((er) => {
        console.log(er.data);
    });
