export default (
  state = {
    QFormState: {
      density: 999.92,
      volumetricFlowRate: 42,
      liquidTemperatureIn: 12,
      liquidTemperatureOut: 7,
    },
    LiquidFormState: {
      liquidType: 'WATER',
      percentage: 100,
      temperature: 9.5,
      freezingTemperature: 0,
    },
    TankFormState: {
      workTimeCoefficient: 0.75,// b
      operatingModeTime: 0.5,// tau
      totalLiquidDuctSystemVolume: 0,
    }
  },
  action
) => {
  //console.log(action)
  switch (action.type) {
    case 'UPDATE_Q_FORM_STATE': //console.log(action.addNewSelectionNumberQFormState);
      state.QFormState = action.QFormState;
      return state;
    case 'UPDATE_LIQUID_FORM_STATE':
      state.LiquidFormState = action.LiquidFormState;
      return state;
    case 'UPDATE_TANK_FORM_STATE':
      state.TankFormState = action.TankFormState;
      return state;
    default: return state;
  }
};
