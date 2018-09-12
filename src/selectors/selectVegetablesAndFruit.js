const FGID = 'vf';

module.exports = ( sources ) =>

  async function selectVegetablesAndFruit( ages, gender ) {

    const servingsObj = ( await sources.queryServings({ ages, gender, fgid:FGID }) )[0];
    const foods       = await sources.queryFoods({ fgid:FGID });

    if ( !servingsObj || !foods.length ) return [];
    const servings = servingsObj.servings;

    // Randomly get food items in the quantity specified by `servings`.
    const selectedFoods = [];
    while ( selectedFoods.length < servings ) {
      selectedFoods.push( foods[ Math.floor( Math.random() * foods.length )] );
    };

    return selectedFoods;
  }
