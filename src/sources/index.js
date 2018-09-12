const queryFoodGroups = require( './queryFoodGroups' );
const queryFoods      = require( './queryFoods' );
const queryServings   = require( './queryServings' );

module.exports = () => ({ queryFoodGroups, queryFoods, queryServings });
