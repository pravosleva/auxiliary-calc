import React, { Component } from 'react';
import LiquidParameters from 'liquid-parameters'; // For cp calc


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
        this.props.updateQFormState({ density, volumetricFlowRate: e.target.value, liquidTemperatureIn, liquidTemperatureOut });
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
      density = LiquidParameters.density({ liquidType, temperature, percentage }).result,
      volumetricFlowRate = obj.QFormState.volumetricFlowRate,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    let Q = cp * volumetricFlowRate * density * (liquidTemperatureIn-liquidTemperatureOut) / 3600;
    //console.log(this._getNumericValue(this._getValueFromLocalStorage({ propName:'coolingCapacity', defaultValue:0 })));

    // For other progects in this site:
    localStorage.setItem('coolingCapacity', Q);

    return (
      <div>
        <h1 id='q'>Q</h1>
        <hr />

        <h2>Input data</h2>
        <label>cp, kJ/kg.K<br /><span style={{color: 'lightgray'}}>[ density = {density.toFixed(2)} kg/m3, {liquidType} {percentage}% ]</span></label>
        <input disabled className='form-control' value={cp.toFixed(2)} />{/* onChange={this.changeQFormState.bind(this, 'cp')}*/}
        {/*<label className='text-muted pull-right'>density = {density.toFixed(2)} kg/m3</label>*/}
        {/*<input disabled className='form-control' value={density.toFixed(2)} />
        <br />*/}
        <label>Volumetric flow rate, m3/h <span style={{color: 'lightgray'}}>[ = {(volumetricFlowRate*1000/3600).toFixed(2)} l/sec ]</span></label>
        <input type='number' style={{MozAppearance:'textfield'}} className='form-control' value={volumetricFlowRate} onChange={this.changeQFormState.bind(this, 'volumetricFlowRate')} />
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>Liquid t in, C</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control' value={liquidTemperatureIn} onChange={this.changeQFormState.bind(this, 'liquidTemperatureIn')} />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>Liquid t out, C</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control' value={liquidTemperatureOut} onChange={this.changeQFormState.bind(this, 'liquidTemperatureOut')} />
          </div>
        </div>

        <h2>Output data</h2>
        <blockquote>
          Q = {Q.toFixed(2)} kW
        </blockquote>
        <div className='well well-sm text-muted' style={{marginTop:'10px'}}>

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
