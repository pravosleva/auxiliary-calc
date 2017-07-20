export default (
  state = {
    formState: {
      cp: 4.19,
      ro: 1000,
      Gm: 42,
      liquidTemperatureIn: 45,
      liquidTemperatureOut: 35
    }
  },
  action
) => {
  //console.log(action)
  switch (action.type) {
    case 'UPDATE_FORM_STATE': //console.log(action.addNewSelectionNumberFormState);
      state.formState = action.formState;
      return state;
    default: return state;
  }
};
