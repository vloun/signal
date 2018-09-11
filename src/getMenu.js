exports.handler = ( event, context, callback ) => {
  console.info('event', event);
  console.info('context', context);

  callback(null, {
    statusCode: 201,
    body: JSON.stringify({
      foods: [
        { name: 'carrot' },
        { name: 'beef' },
        { name: 'apple' }
      ]
    }),
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
  });
};
