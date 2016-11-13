const helmet = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HELMET':
      return {
        id: action.id,
        name: action.text,
        data: []
      }
    case 'HELMET_DATA':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        data: [...state.data, action.datapoint]
      })

    default:
      return state
  }
}

const helmets = (state = {}, action) => {
  switch(action.type){
    case 'HELMET_DATA':
      var new_state = Object.assign({}, state)
      new_state[action.helmet.id] = Object.assign({}, state[action.helmet.id], action.helmet)
      return new_state
    default:
      return state
  }
}

const helmetsApp = (state = {}, action) => {
  return {
    helmets:helmets(state.helmets, action),
    title: "test"
  }
}

export default helmetsApp;
