export const getPokemonsQuery = `
  fragment differentForm on DifferentForm {
    no
    name
    engName
    image
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
  fragment deepDifferentForm on DifferentForm {
    ...differentForm
    differentForm {
      ...differentForm
      differentForm {
        ...differentForm
      }
    }
  }
  query {
    getPokemons(page: 2) {
      no
      name
      engName
      image
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
        ...deepDifferentForm
      }
      searchCount
    }
  }
`;
