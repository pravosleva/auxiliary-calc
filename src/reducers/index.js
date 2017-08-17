export default (
  state = {
    QFormState: {
      cp: 4.19,
      ro: 1000,
      Gm: 42,
      liquidTemperatureIn: 45,
      liquidTemperatureOut: 35
    },
    GlycoleFormState: {
      glycoleType: 'MEG',
      percentage: 10,
      temperature: 50,
      ro: 1000,
      freezingTemperature: 0
    }
  },
  action
) => {
  //console.log(action)
  switch (action.type) {
    case 'UPDATE_Q_FORM_STATE': //console.log(action.addNewSelectionNumberQFormState);
      state.QFormState = action.QFormState;
      return state;
    case 'UPDATE_GLYCOLE_FORM_STATE':
      state.GlycoleFormState = action.GlycoleFormState;
      return state;
    default: return state;
  }
};
