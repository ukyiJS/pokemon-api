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

  fragment PokemonEvolvingTo on EvolvingTo {
    no
    name
    image
    form
    condition
  }

  fragment EvolvingTo on EvolvingTo {
    ...PokemonEvolvingTo
    evolvingTo {
      ...PokemonEvolvingTo
      evolvingTo {
        ...PokemonEvolvingTo
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
export const getPokemonQuery = `
  {
    getPokemon(pokemonName: "이상해씨") {
      no
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

  fragment PokemonEvolvingTo on EvolvingTo {
    no
    name
    image
    form
    condition
  }

  fragment EvolvingTo on EvolvingTo {
    ...PokemonEvolvingTo
    evolvingTo {
      ...PokemonEvolvingTo
      evolvingTo {
        ...PokemonEvolvingTo
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
export const getAutoCompleteKeywordQuery = `
  {
    getAutoCompleteKeyword(keyword:"이ㅂ", display: 10)
  }
`;
