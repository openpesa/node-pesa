---
id: configuration
title: Usage Guide
---

## A note on use outside of Node.js

This is a JavaScript library, a language which is universal by nature. While it is theoretically possible to include this library into a website or mobile app, it is not recommended to do so.

In the typical setup, you will make calls to given Payment API ‒ through one of our libraries ‒ from your server (e.g. a Node.js server). Your API key sits safely on this server, out of reach to the outside world.

If you include this library in a website or app, however, your API key will be shipped to users. With this key, users will be able to act on your behalf.

<!--
## Reactive native

-->
