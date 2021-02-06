---
id: express_app
title: Intergation with an Express js app
---

:::caution

## Warning! 🚧 WIP!

:::

In this tutorial, we will learn the Express framework and how to intergate the pesa-js sdk. This Expressjs is built in such a way that it acts as a minimal and flexible Node.js web application framework, providing a robust set of features for building single and multipage, and hybrid web application.


:::info

> This is a very basic example show casing the Customer to Bussiness transaction 

:::

 
In this tutorial, you will learn-

-   What is [Express.js](https://expressjs.com/)?
-   Installing and using Express, Routes?
-   Sample Web server using express.js
-   Intergrating Pesa sdk

## What is Express.js?

Express.js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications.

It has become the standard server framework for [Node.js](https://nodejs.org/). Express is the backend part of something known as the [MERN stack](https://www.mongodb.com/mern-stack).

## Installing and using Express

We will be using [`express-generator`](https://expressjs.com/en/starter/generator.html) to quickly create an application skeleton. You can run the application generator with the `npx command` (available in Node.js 8.2.0 +).

```sh
npx express-generator --no-view myapp
```

An Express app named `myapp` will be created in a folder named `myapp/` in the current working directory, no view engine will be set;

```js title="src/app.js"
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

Run the app with the following command:

```sh
node src/app.js
```

Then, load `http://localhost:3000/` in a browser to see the output.
or run curl

```js
curl http://localhost:3000/
```

## Intergrating Pesa sdk

Install the package

```sh
npm i @openpesa/pesa-js
```

Add the

```js {2,9-10,16-33} title="src/app.js"
const express = require('express');
const { Pesa } = require('@openpesa/pesa-js');

const app = express();
const port = 3000;

// Populate the credentials
const api_key = 'your_api_key';
const public_key = 'the_public_key';
let pesa = new Pesa({ api_key, public_key }, 'sandbox');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pay', (req, res) => {
    // Setup the transaction
    let data = {
        input_Amount: req.body.ammount,
        // ..
    };

    // Execute the transaction
    pesa.c2b(data)
        .then((data) => {
            // Print results
            console.log(data);
            res.send('success');
        })
        .catch((e) => {
            console.log('err: ' + e);
            res.send('error: failed');
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

```sh
curl -X POST -H 'Content-Type: application/json' -d '{"ammount": "1234"}' http://localhost:3000/pay
```


