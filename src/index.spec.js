const jsonApiParser = require('./');

test('to parse event body into data', () => {
  const body = {
    data: 'data',
  };
  const handler = {
    event: {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    },
  };
  const next = jest.fn();

  jsonApiParser().before(handler, next);

  expect(handler.event.data).toEqual('data');
});


test('to throw error when body is invalid JSON', () => {
  const handler = {
    event: {
      body: '{notjson)',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    },
  };
  const next = jest.fn();

  const caller = () => jsonApiParser().before(handler, next);

  expect(caller).toThrow('Content type defined as JSON but an invalid JSON was provided');
});

