const queryFoods    = require( './queryFoods' );
const queryServings = require( './queryServings' );

module.exports = () => ({ queryFoods, queryServings });
