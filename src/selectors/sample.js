// Gets a random element from an array. Normally we would just import `lodash.sample`,
// but we're taking a shortcut to minimize build steps in this example project.
module.exports = ( arr ) => arr[ Math.floor( Math.random() * arr.length )]
