const selectDairy              = require( './selectDairy' );
const selectGrains             = require( './selectGrains' );
const selectMeats              = require( './selectMeats' );
const selectVegetablesAndFruit = require( './selectVegetablesAndFruit' );

module.exports = ( sources ) => ({
  selectDairy: selectDairy( sources ),
  selectGrains: selectGrains( sources ),
  selectMeats: selectMeats( sources ),
  selectVegetablesAndFruit: selectVegetablesAndFruit( sources )
});
