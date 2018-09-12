const sample = require( './sample' );

const FGID              = 'vf';
const GREEN_VEGGIE_CAT  = 'Dark green vegetable';
const ORANGE_VEGGIE_CAT = 'Orange vegetable';

module.exports = ( sources ) =>

  async function selectVegetablesAndFruit( ages, gender ) {

    const servingsObj = ( await sources.queryServings({ ages, gender, fgid:FGID }) )[0];
    const foods       = await sources.queryFoods({ fgid:FGID });
    const foodGroups  = await sources.queryFoodGroups({ fgid:FGID });

    // In a more robust API, some of these probably would be internal errors.
    if ( !servingsObj || !foods.length || !foodGroups.length ) return [];

    const servings      = servingsObj.servings;
    const selectedFoods = [];

    // Apply the directional statement: "Eat at least one dark green and one orange vegetable each day"
    const greenCatId    = foodGroups.find( ( item ) => item.fgcat == GREEN_VEGGIE_CAT ).fgcat_id;
    const orangeCatId   = foodGroups.find( ( item ) => item.fgcat == ORANGE_VEGGIE_CAT ).fgcat_id;
    const greenVeggies  = foods.filter( ( item ) => item.fgcat_id == greenCatId );
    const orangeVeggies = foods.filter( ( item ) => item.fgcat_id == orangeCatId );
    selectedFoods.push( sample( greenVeggies ), sample( orangeVeggies ) );

    // Randomly get more food items up the quantity specified by `servings`.
    while ( selectedFoods.length < servings ) {
      selectedFoods.push( sample( foods ));
    };

    return selectedFoods;
  }
