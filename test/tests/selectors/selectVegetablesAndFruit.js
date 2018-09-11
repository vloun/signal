const expect = require( 'chai' ).expect;

const selectVegetablesAndFruit = require( '../../../src/selectors/selectVegetablesAndFruit' );

const groupServingsByAges = require( '../../fixtures/groupServingsByAges' );
const foodsByGroup        = require( '../../fixtures/foodsByGroup' );

const getServingsByDemographic = async ( ages ) => groupServingsByAges()[ ages ];
const getFoodsByGroup          = async ( fgid ) => foodsByGroup()[ fgid ];

describe( 'selectVegetablesAndFruit()', function(){

  beforeEach( function() {
    // Base dependencies and args that can be overriden in each test
    this.deps   = { getFoodsByGroup, getServingsByDemographic };
    this.ages   = '2 to 3';
    this.gender = 'Female';

    this.runUnit = function(){ return selectVegetablesAndFruit( this.deps )( this.ages, this.gender ) };
  });

  it( 'is defined', function(){
    expect( selectVegetablesAndFruit ).to.be.a( 'function' );
  })

  context( 'when passed an invalid age range', function() {
    beforeEach( function() {
      this.ages = '200 to 300';
      expect( groupServingsByAges ).to.not.have.property( this.ages );
    });

    it( 'returns an empty list', async function() {
      expect( await this.runUnit() ).to.be.an( 'array' ).that.is.empty;
    });
  })

  context( 'when passed a valid age range', function() {
    beforeEach( function() {
      expect( groupServingsByAges ).to.not.have.property( this.ages );
    });

    it( 'returns a list of foods', async function(){
      const selectedFoods = await this.runUnit();
      expect( selectedFoods    ).to.be.an( 'array' ).that.is.not.empty;
      expect( selectedFoods[0] ).to.have.property( 'food' );
    });

  });
});
