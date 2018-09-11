const expect = require( 'chai' ).expect;

const selectVegetablesAndFruit = require( '../../../src/selectors/selectVegetablesAndFruit' );

const groupServingsByAges = require( '../../fixtures/groupServingsByAges' );
const foodsByGroup        = require( '../../fixtures/foodsByGroup' );

const getServingsByDemographic = async () => groupServingsByAges()[ '2 to 3' ];
const getFoodsByGroup          = async () => foodsByGroup()[ 'vf' ];
const mockSources              = { getFoodsByGroup, getServingsByDemographic };

describe( 'selectVegetablesAndFruit', function(){

  it( 'returns a list of foods', async function(){
    const selectedFoods = await selectVegetablesAndFruit( mockSources )();
    expect( selectedFoods    ).to.be.an( 'array' ).that.is.not.empty;;
    expect( selectedFoods[0] ).to.have.property( 'food' );
  });

});
