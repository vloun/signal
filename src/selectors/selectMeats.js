const FGID = 'me';

module.exports = ( sources ) =>

  async function selectVegetablesAndFruit( ages, gender ) {

    const servingsObj = ( await sources.queryServings({ ages, gender, fgid:FGID }) )[0];
    const foods       = await sources.queryFoods({ fgid:FGID });

    if ( !servingsObj || !foods.length ) return [];
    const servings = servingsObj.servings;

    const selectedFoods = [];
    while ( selectedFoods.length < servings ) {
      selectedFoods.push( foods[ Math.floor( Math.random() * foods.length )] );
    };

    return selectedFoods;
  }
