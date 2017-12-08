import React, { Component } from 'react';
import LiquidParameters from '../Liquid/LiquidParameters';// For cp calc
//css..

class Q extends Component {
  constructor(props){
    super(props);
    //this.state = {};
    //this.axiosReqForClientlist = this.axiosReqForClientlist.bind(this);
    //this.render = this.render.bind(this);
    this._getNumericValue = this._getNumericValue.bind(this);
  }

  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeQFormState(propName, e) {
    let _changeTemperatureInLiquidFormState = (tin, tout) => {
      let {
        liquidType,
        percentage,
        temperature,
        freezingTemperature
      } = obj.LiquidFormState;
      temperature = (tin + tout)/2;
      this.props.updateLiquidFormState({ liquidType, percentage, temperature, freezingTemperature });
    };
    const { obj } = this.props;
    let {
      density,
      volumetricFlowRate,
      liquidTemperatureIn,
      liquidTemperatureOut
    } = obj.QFormState;

    //console.log(workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume);
    switch(propName){
      case 'density':
        this.props.updateQFormState({ density: this._getNumericValue(e.target.value), volumetricFlowRate, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'volumetricFlowRate':
        this.props.updateQFormState({ density, volumetricFlowRate: this._getNumericValue(e.target.value), liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'liquidTemperatureIn':
        this.props.updateQFormState({ density, volumetricFlowRate, liquidTemperatureIn: this._getNumericValue(e.target.value), liquidTemperatureOut });
        _changeTemperatureInLiquidFormState(this._getNumericValue(e.target.value), liquidTemperatureOut);
        break;
      case 'liquidTemperatureOut':
        this.props.updateQFormState({ density, volumetricFlowRate, liquidTemperatureIn, liquidTemperatureOut: this._getNumericValue(e.target.value) });
        _changeTemperatureInLiquidFormState(this._getNumericValue(liquidTemperatureIn), this._getNumericValue(e.target.value));
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
    let cpObj = LiquidParameters.cp({ liquidType, percentage, temperature }),
      cp = cpObj.result, cpError = cpObj.error, cpReport = cpObj.report,
      density = obj.QFormState.density,
      volumetricFlowRate = obj.QFormState.volumetricFlowRate,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    let Q = cp * volumetricFlowRate * density * (liquidTemperatureIn-liquidTemperatureOut) / 3600;
    //console.log(this._getNumericValue(this._getValueFromLocalStorage({ propName:'coolingCapacity', defaultValue:0 })));

    // For other progects in this site:
    localStorage.setItem('coolingCapacity', Q);

    return (
      <div>
        <h1>Q</h1>
        <hr />

        <h2>Input data</h2>
        <label>cp, kJ/kg.K <span style={{color: 'lightgray'}}>[ density = {density.toFixed(2)} kg/m3 ]</span></label>
        <input disabled className='form-control input-sm' value={cp.toFixed(2)} />{/* onChange={this.changeQFormState.bind(this, 'cp')}*/}
        {/*<label className='text-muted pull-right'>density = {density.toFixed(2)} kg/m3</label>*/}
        {/*<input disabled className='form-control input-sm' value={density.toFixed(2)} />
        <br />*/}
        <label>Volumetric flow rate, m3/h</label>
        <input className='form-control input-sm' value={volumetricFlowRate} onChange={this.changeQFormState.bind(this, 'volumetricFlowRate')} />
        <label>Liquid Temperature in, C</label>
        <input className='form-control input-sm' value={liquidTemperatureIn} onChange={this.changeQFormState.bind(this, 'liquidTemperatureIn')} />
        <label>Liquid Temperature out, C</label>
        <input className='form-control input-sm' value={liquidTemperatureOut} onChange={this.changeQFormState.bind(this, 'liquidTemperatureOut')} />

        <h2>Output data</h2>
        <div className='well well-sm text-muted' style={{marginTop:'10px'}}>
          Required Cooling Capacity
          <pre>
            Q = {Q.toFixed(2)} kW
          </pre>
          This Q value was set to localStorage as coolingCapacity. It can be used in other projects.
          <br />
          <code className={cpError===true?'text-danger':'text-muted'}>
            {cpReport}
          </code>
        </div>

      </div>
    );
  }
}

export default Q;
