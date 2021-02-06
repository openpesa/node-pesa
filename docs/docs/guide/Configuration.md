---
id: configuration
title: Configuration
---


By default only an

- apikey and
- publickey 


are required 

```js

import { Pesa } from '@openpesa/pesa-js';

// Populate the credentials
const api_key = 'your_api_key';
const public_key = 'the_public_key';

// Intiate with credentials
let pesa = new Pesa({ api_key, public_key });

// Setup the transaction
let data = {
    input_Amount: 10000,
    // ..
};

// Execute the transaction
pesa.c2b(data)
    .then((data) => {
        // Print results
        console.log(data);
    })
    .catch((e) => {
        console.log('err: ' + e);
    });
```
