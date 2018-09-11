const fgid = 'vf';

module.exports = ( sources ) =>

  async function selectVegetablesAndFruit( ages, gender ) {
    const servings = await sources.getServingsByDemographic( ages, gender );
    // In a real-world API, we might validate the args and return useful error messages instead.
    if ( !servings || !servings.length ) return [];

    const foods = await sources.getFoodsByGroup( fgid );
    return foods;
  }
