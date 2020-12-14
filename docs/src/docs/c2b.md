# Customer 2 Bussines Transaction Fundamentals

## How to transact from customer to business

In this course, we will cover what you need to transact from customers to businesses using Node.js.

First, we set up the application in the portal.

When building apps on the sandbox environment, Using the sandbox credentials allows us to test our application logic without incurring any costs.

We will import the required libraries which have already been pre-installed.

Here’s the code that does this:


```js
const { Pesa } = require('@openpesa/pesa-js');
```

The above code imports the Pesa SDK for us.

Next, we set our app credentials.


```js
let apiKey     = "your_API_key";
let publicKey  = "your_public_key";
```

These are the credentials that we use to authenticate requests to the Mpesa OpenAPI service.

Now we are going to initialize the Pesa SDK.

```js
cosnt pesa = new Pesa({
    'api_key' : apiKey,
    'public_key' : publicKey,
}, 'sandbox');

```

We have just required the Pesa module into our app and assigned it to the `pesa` variable. We initialize it with our `api_key` and `public_key` which will be used to make authenticated transactions. Easy right?

Now let’s set up our transaction.

```js

let data = {
    'input_Amount' : 5000,
    'input_CustomerMSISDN' : '000000000001',
    'input_Country' : 'TZN',
    'input_Currency' : 'TZS',
    'input_ServiceProviderCode' : '000000',
    'input_TransactionReference' : 'T12344Z',
    'input_ThirdPartyConversationID' : '1e9b774d1da34af78412a498cbc28f5d',
    'input_PurchasedItemsDesc' : 'Test Three Item'
};

```

To transact from customer to business, you need the following:

- An Amount
- A CustomerMSISDN
- Country
- Currency
- Service Provider Code
- Transaction Reference
- Purchased Items Desc
- ThirdParty Conversation ID

Next, we have a function to execute the transaction right below the `// Execute transaction` line.


```js
// Execute transaction
pesa.c2b(data)
    .then((data) => {
        // print results
        console.log(data);
    })
    .catch((er) => {
        // print error
        console.log(er.data);
    });    
```


If the code works and the transaction is successful, it will print the response onto the console logs. If it’s not successful, it will print out an error instead.


Sample response
```
{
  output_ResponseCode: 'INS-0',
  output_ResponseDesc: 'Request processed successfully',
  output_TransactionID: 'o3FgzDqPV8pZ',
  output_ConversationID: '93a87b6f06074fba92d14bda995b21b12',
  output_ThirdPartyConversationID: 'rerekf'
}
```

You’re all set!



## Example Full 


```js
const { Pesa } = require('@openpesa/pesa-js');

let publicKey = '';
let apiKey = '';

let pesa = new Pesa(
    {
        api_key: apiKey,
        public_key: publicKey,
    },
    'sandbox',
);

let data = {
    input_Amount: 5000,
    input_CustomerMSISDN: '000000000001',
    input_Country: 'TZN',
    input_Currency: 'TZS',
    input_ServiceProviderCode: '000000',
    input_TransactionReference: 'T12344Z',
    input_ThirdPartyConversationID: '1e9b774d1da34af78412a598cbc28f5d',
    input_PurchasedItemsDesc: 'Test Three Item',
};

pesa.c2b(data)
    .then((data) => {
        console.log(data);
    })
    .catch((er) => {
        console.log(er.data);
    });
```

Happy Coding!! 😀
