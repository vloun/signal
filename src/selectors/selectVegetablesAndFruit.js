const fgid = 'vf';

module.exports = ( sources ) =>

  async function selectVegetablesAndFruit( ages, gender ) {
    const servings = await sources.getServingsByDemographic( ages, gender );
    const foods    = await sources.getFoodsByGroup( fgid );

    return foods;
  }
