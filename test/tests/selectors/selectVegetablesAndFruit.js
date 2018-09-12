const expect = require( 'chai' ).expect;

const selectVegetablesAndFruit = require( '../../../src/selectors/selectVegetablesAndFruit' );

const foods    = require( '../../fixtures/foods' );
const servings = require( '../../fixtures/servings' );

describe( 'selectVegetablesAndFruit()', function(){

  beforeEach( function() {
    // Base dependencies and args that can be overriden in each test.
    // Mocked with data to match the query args (ages 2-3, female).
    this.deps = {
      queryFoods:    async ( opts ) => foods()[ 'vf' ],
      queryServings: async ( opts ) => servings()[ '2to3_female_vf' ]
    };
    this.ages   = '2 to 3';
    this.gender = 'Female';

    this.runUnit = function(){ return selectVegetablesAndFruit( this.deps )( this.ages, this.gender ) };
  });

  it( 'is defined', function(){
    expect( selectVegetablesAndFruit ).to.be.a( 'function' );
  })

  context( 'when the data source does not have any matching servings', function() {
    beforeEach( function() {
      this.deps.queryServings = async () => [];
    });

    it( 'returns an empty list', async function() {
      expect( await this.runUnit() ).to.be.an( 'array' ).that.is.empty;
    });
  })

  context( 'when the data source has matching servings', function() {
    beforeEach( async function() {
      expect( await this.deps.queryServings() ).to.be.an( 'array' ).that.is.not.empty;
    });

    context( 'when the data source has matching foods', function() {
      beforeEach( async function() {
        expect( await this.deps.queryFoods() ).to.be.an( 'array' ).that.is.not.empty;
      });

      it( 'returns a list of foods', async function(){
        const selectedFoods = await this.runUnit();
        expect( selectedFoods    ).to.be.an( 'array' ).that.is.not.empty;
        expect( selectedFoods[0] ).to.have.property( 'food' );
      });
    });

    context( 'when the data source does not have matching foods', function() {
      beforeEach( function() {
        this.deps.queryFoods = async () => [];
      });

      it( 'returns an empty list', async function(){
        expect( await this.runUnit() ).to.be.an( 'array' ).that.is.empty;
      });
    });

  });
});
