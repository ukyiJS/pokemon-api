export const getPokemonsQuery = `
  {
    getPokemons(page:1) {
      no
      name
      engName
      image
      icon
      types
      stats {
        name
        value
      }
      types
      typeDefenses {
        type
        damage
      }
      species
      height
      weight
      abilities
      hiddenAbility
      evYield
      catchRate
      friendship
      exp
      eegGroups
      gender {
        name
        ratio
      }
      eggCycles {
        cycle
        step
      }
      form
      differentForm {
        ...DifferentForm
      }
      evolvingTo {
        ...EvolvingTo
      }
      createdAt
      searchCount
    }
  }

  fragment PokemonOfEvolvingTo on EvolvingTo {
    no
    name
    image
    form
    condition
  }

  fragment EvolvingTo on EvolvingTo {
    ...PokemonOfEvolvingTo
    evolvingTo {
      ...PokemonOfEvolvingTo
      evolvingTo {
        ...PokemonOfEvolvingTo
      }
    }
  }

  fragment DifferentForm on DifferentForm {
    no
    engName
    image
    types
    stats {
      name
      value
    }
    types
    typeDefenses {
      type
      damage
    }
    species
    height
    weight
    abilities
    hiddenAbility
    evYield
    catchRate
    friendship
    exp
    eegGroups
    gender {
      name
      ratio
    }
    eggCycles {
      cycle
      step
    }
    form
  }
`;
