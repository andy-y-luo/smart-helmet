const helmet = (state = {}, action) => {
  switch (action.type) {
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

const helmet_readings = (state = [], action) => {
  if(action.type == 'HELMET_READING' ){
    var new_state = [...state, {x: action.data.time, y: action.data.value}]
    if(new_state.length > 200){
      new_state.splice(0, 1);
    }
    return new_state
  }
}

const helmets = (state = {}, action) => {
  switch(action.type){
    case 'HELMET_DATA':
      var new_state = Object.assign({}, state)
      new_state[action.helmet.id] = Object.assign({readings:[]}, state[action.helmet.id], action.helmet)
      return new_state
    case 'HELMET_READING':
      var new_state = Object.assign({}, state)
      new_state[action.data.id] = Object.assign(new_state[action.data.id])
      new_state[action.data.id].readings = helmet_readings(new_state[action.data.id].readings, action)
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
