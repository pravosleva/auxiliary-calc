import React, { Component } from 'react';
import LiquidParameters from '../Liquid/LiquidParameters';// For cp calc
//import interpolate from '../interpolate';

class Tank extends Component {
  constructor(props){
    super(props);
    //this.state = {};
    //this.axiosReqForClientlist = this.axiosReqForClientlist.bind(this);
    //this.render = this.render.bind(this);
    this._getNumericValue = this._getNumericValue.bind(this);
  }

  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeTankFormState(propName, e) {
    const { obj } = this.props;
    let workTimeCoefficient = obj.TankFormState.workTimeCoefficient,
      operatingModeTime = obj.TankFormState.operatingModeTime,
      totalLiquidDuctSystemVolume = obj.TankFormState.totalLiquidDuctSystemVolume;
    switch(propName){
      case 'workTimeCoefficient':
        this.props.updateTankFormState({ workTimeCoefficient: e.target.value, operatingModeTime, totalLiquidDuctSystemVolume });
        break;
      case 'operatingModeTime':
        this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime: e.target.value, totalLiquidDuctSystemVolume });
        break;
      case 'totalLiquidDuctSystemVolume':
        this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume: e.target.value });
        break;
      default: break;
    }
  }
  _getValueFromLocalStorage(obj) {
    let { propName, defaultValue } = obj;
		let result = localStorage.getItem(propName) || defaultValue;
		return result;
  }
  render() {
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let workTimeCoefficient = obj.TankFormState.workTimeCoefficient,
      operatingModeTime = obj.TankFormState.operatingModeTime,
      totalLiquidDuctSystemVolume = obj.TankFormState.totalLiquidDuctSystemVolume,
      cpObj = LiquidParameters.cp({ liquidType, percentage, temperature }),
      cp = cpObj.result, cpError = cpObj.error, cpReport = cpObj.report,
      density = obj.QFormState.density,
      volumetricFlowRate = obj.QFormState.volumetricFlowRate,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    //console.log(liquidTemperatureIn, liquidTemperatureOut);
    let Q = cp * volumetricFlowRate * density * (liquidTemperatureIn-liquidTemperatureOut) / 3600;// kW
    Q = Q * 3600;// to kJ/h
    //console.log(density, cp, Q *((1 - workTimeCoefficient ) * 0.5 ), ( cp * density * ( liquidTemperatureIn - liquidTemperatureOut ) ), totalLiquidDuctSystemVolume );
    //console.info( ( 703.96 * 3600 *((1 - 0.75 ) * 0.5 ) / ( 4.19 * 999.9 * ( liquidTemperatureIn - liquidTemperatureOut ) ) - totalLiquidDuctSystemVolume ) );
    let Vt = ( Q * (1 - workTimeCoefficient) * operatingModeTime / ( cp * density * ( liquidTemperatureIn - liquidTemperatureOut ) ) ) - totalLiquidDuctSystemVolume,
      Vt_l = Vt * density;// to liters
    if(Vt > 0){ /* Ok */ } else {
      Vt = 0;
      Vt_l = 0;
    }
    //console.log(this._getNumericValue(this._getValueFromLocalStorage({ propName:'coolingCapacity', defaultValue:0 })));

    // For other progects in this site:
    //localStorage.setItem('coolingCapacity', Q);

    let recommendedTau = function(){
      if(Q <= 188.5){// kJ/h
        return 0.25
      } else if(Q >= 188.5 && Q < 754.2) {
        return 0.35;
      } else {
        return 0.5;
      }
    };

    return (
      <div>
        <h1>Tank</h1>
        <hr />

        <h2>Input data</h2>
        <label>Work time coeff, dimensionless</label>
        <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={workTimeCoefficient} onChange={this.changeTankFormState.bind(this, 'workTimeCoefficient')} />
        <label>Operating mode time Start-Finish, h</label>
        <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={operatingModeTime} onChange={this.changeTankFormState.bind(this, 'operatingModeTime')} />
        <label className={totalLiquidDuctSystemVolume > 0 ? '' : 'text-danger'}>V liquid duct system, m3</label>
        <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={totalLiquidDuctSystemVolume} onChange={this.changeTankFormState.bind(this, 'totalLiquidDuctSystemVolume')} />

        <h2>Output data</h2>
        <blockquote>
          Vt = {Vt.toFixed(2)} m3 = {Vt_l.toFixed(2)} liters
        </blockquote>
        <div className='well well-sm text-muted' style={{marginTop:'10px'}}>

          Lfv = {volumetricFlowRate} m3/h = {(volumetricFlowRate * density / 3600).toFixed(2)} kg/s
          <br />
          See also recommended operating mode time (tau) values by Q = {Q.toFixed(2)} kJ/h<br />
          tau = {recommendedTau().toFixed(2)}
          {/*<ul>
            <li>tau = 0.25 h for Q &#8804; 188.5 kJ/h</li>
            <li>tau = 0.35 h for 188.5 kJ/h (0.05 kW) &#8804; Q &#8804; 754.2 kJ/h (0.2 kW)</li>
            <li>tau = 0.50 h for Q &#8805; 754.2 kJ/h (0.2 kW)</li>
          </ul>*/}
        </div>

      </div>
    );
  }
}

export default Tank;
