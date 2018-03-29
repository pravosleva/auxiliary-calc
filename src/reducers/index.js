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
    },
    TubePressureDropFormState: {
      tubeDiameter: 0.0127,// m
      tubeLength: 15.0,// m
      diameterOptions: [
        { value: 0.0127, label: '1/2' },
        { value: 0.01905, label: '3/4' },
        { value: 0.0254, label: '1' },
        { value: 0.0381, label: '1 1/2' },
        { value: 0.04445, label: '1 3/4' },
        { value: 0.0508, label: '2' },
        { value: 0.0635, label: '2 1/2' },
        { value: 0.06985, label: '2 3/4' },
        { value: 0.0762, label: '3' },
        { value: 0.1016, label: '4' },
        { value: 0.127, label: '5' },
        { value: 0.1524, label: '6' },
        { value: 0.1778, label: '7' },
        { value: 0.2032, label: '8' },

        { value: 0.022, label: '22 mm' },
        { value: 0.044, label: '44 mm' },
        { value: 0.060, label: '60 mm' },
        { value: 0.080, label: '80 mm' },
        { value: 0.100, label: '100 mm' },
      ],
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
    case 'UPDATE_TUBE_PRESSURE_DROP_FORM_STATE':
      state.TubePressureDropFormState = action.TubePressureDropFormState;
      return state;
    //case 'SET_OPTIMAL_TUBE_DIAMETER_PRESSURE_DROP_FORM_STATE':
    //  state.TubePressureDropFormState = action.TubePressureDropFormState;
    //  return state;
    default: return state;
  }
};
