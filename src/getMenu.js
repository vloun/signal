const sources   = require( './sources' )();
const selectors = require( './selectors' )( sources );

exports.handler = async function getMenu( event, context, callback ) {
  const { ages, gender } = event.queryStringParameters;

  const dairy   = await selectors.selectDairy( ages, gender );
  const grains  = await selectors.selectGrains( ages, gender );
  const meat    = await selectors.selectMeats( ages, gender );
  const veggies = await selectors.selectVegetablesAndFruit( ages, gender );

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ dairy, grains, meat, veggies }),
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
  });
};
