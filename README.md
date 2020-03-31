# Middy JSON API Parser

This is a [middy](https://middy.js.org/) middleware, which is parsing AWS API Gateway events according to the [JSON:API spec](https://jsonapi.org/).

## Installation

```sh
npm install @joblocal/middy-json-api-parser
```

## Usage

```js
# handler.js
const middy = require('middy');
const jsonApiParser = require('@joblocal/middy-json-api-parser');

const yourHandler = (event) => {
  console.log(event.data);
};

const handler = middy(yourHandler)
  .use(jsonApiParser());

module.exports = { handler };
```
