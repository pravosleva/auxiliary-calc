import React, { Component } from 'react';
import LiquidParameters from '../Liquid/LiquidParameters';// For cp calc
//css..

class Q extends Component {

  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeQFormState(propName, e) {
    const { obj } = this.props;
    let ro = obj.QFormState.ro,
      Gm = obj.QFormState.Gm,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    switch(propName){
      case 'ro':
        this.props.updateQFormState({ ro: e.target.value, Gm, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'Gm':
        this.props.updateQFormState({ ro, Gm: e.target.value, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'liquidTemperatureIn':
        this.props.updateQFormState({ ro, Gm, liquidTemperatureIn: e.target.value, liquidTemperatureOut });
        break;
      case 'liquidTemperatureOut':
        this.props.updateQFormState({ ro, Gm, liquidTemperatureIn, liquidTemperatureOut: e.target.value });
        break;
      default: break;
    }
  }
  render() {
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let cpObj = LiquidParameters.cp({ liquidType, percentage, temperature }),
      cp = cpObj.result, cpError = cpObj.error, cpReport = cpObj.report,
      ro = obj.QFormState.ro,
      Gm = obj.QFormState.Gm,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    //...
    let Q = cp * Gm * ro * (liquidTemperatureIn-liquidTemperatureOut) / 3600;// to kW
    return (
      <div>
        <h1>Q by Liquid Flow</h1>
        <hr />

        <h2>Input data</h2>
        <label>cp, kJ/kg.K <span style={{color: 'lightgray'}}>[ ro = {ro.toFixed(2)} kg/m3 ]</span></label>
        <input disabled className='form-control input-sm' value={cp.toFixed(2)} />{/* onChange={this.changeQFormState.bind(this, 'cp')}*/}
        {/*<label className='text-muted pull-right'>ro = {ro.toFixed(2)} kg/m3</label>*/}
        {/*<input disabled className='form-control input-sm' value={ro.toFixed(2)} />
        <br />*/}
        <label>Gm, m3/h</label>
        <input className='form-control input-sm' value={Gm} onChange={this.changeQFormState.bind(this, 'Gm')} />
        <label>Liquid Temperature in, C</label>
        <input className='form-control input-sm' value={liquidTemperatureIn} onChange={this.changeQFormState.bind(this, 'liquidTemperatureIn')} />
        <label>Liquid Temperature out, C</label>
        <input className='form-control input-sm' value={liquidTemperatureOut} onChange={this.changeQFormState.bind(this, 'liquidTemperatureOut')} />

        <h2>Output data</h2>
        <strong>Q = {Q.toFixed(2)} kW</strong><br />
        <code className={cpError===true?'text-danger':'text-muted'}>
          {cpReport}
        </code>

      </div>
    );
  }
}

export default Q;
