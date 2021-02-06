---
id: configuration
title: Configuration
---

## Options

With simplicity in mind, pesa-js sdk is also flexible allowing several configutation to fine tune to your needs.

<!-- With only three requied attirbutes  -->

| Attribute  | Required | Data type | Default value | Available options |
| ---------- | -------- | --------- | ------------- | ----------------- |
| market     | ❌       | string    | TZN           | TZN,GHA           |
| currency   | ❌       | string    | TZS           | TZS,GHS           |
| api_key    | ✅       | string    | null          |                   |
| public_key | ✅       | string    | null          |                   |
| enviroment | ✅       | string    | sandbox       |                   |

## Http Client Options

<!-- ```ts
client_options?: Array<string>;
``` -->

| Attribute | Required | default value |
| --------- | -------- | ------------- |
| header    | ❌       | {}            |
| origin    | ❌       | \*            |

## Full initialization syntax

```ts
import { Pesa } from '@openpesa/pesa-js';

// Intiate with credentials
let pesa = new Pesa({
    api_key: 'asdf',
    public_key: 'asdf',
    market:'TZN',
    currency:'TZS',
    options: {
        origin : '*',
        headers: {
            'X-App-version' : '1.2.3'
        }
    }
},
environment:'sandbox');
```
