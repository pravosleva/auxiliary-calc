import React, { Component } from 'react';
//css..

class Q extends Component {

  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeFormState(propName, e) {
    const { obj } = this.props;
    let cp = obj.formState.cp,
      ro = obj.formState.ro,
      Gm = obj.formState.Gm,
      liquidTemperatureIn = obj.formState.liquidTemperatureIn,
      liquidTemperatureOut = obj.formState.liquidTemperatureOut;
    //...
    switch(propName){
      case 'cp':
        this.props.updateFormState({ cp: e.target.value, ro, Gm, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'ro':
        this.props.updateFormState({ cp, ro: e.target.value, Gm, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'Gm':
        this.props.updateFormState({ cp, ro, Gm: e.target.value, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'liquidTemperatureIn':
        this.props.updateFormState({ cp, ro, Gm, liquidTemperatureIn: e.target.value, liquidTemperatureOut });
        break;
      case 'liquidTemperatureOut':
        this.props.updateFormState({ cp, ro, Gm, liquidTemperatureIn, liquidTemperatureOut: e.target.value });
        break;
      default: break;
    }
  }
  render() {
    const { obj } = this.props;
    let cp = obj.formState.cp,
      ro = obj.formState.ro,
      Gm = obj.formState.Gm,
      liquidTemperatureIn = obj.formState.liquidTemperatureIn,
      liquidTemperatureOut = obj.formState.liquidTemperatureOut;
    //...
    let Q = cp * Gm * ro * (liquidTemperatureIn-liquidTemperatureOut) / 3600 // to kW
    return (
      <div className='container'>
        <h1>Cooling Capacity by Liquid Flow</h1>
        <h2>Input data</h2>
        <label>cp, kJ/kg.K</label>
        <input className='form-control inout-sm' value={cp} onChange={this.changeFormState.bind(this, 'cp')} />
        <label>ro, kg/m3</label>
        <input className='form-control inout-sm' value={ro} onChange={this.changeFormState.bind(this, 'ro')} />
        <label>Gm, m3/h</label>
        <input className='form-control inout-sm' value={Gm} onChange={this.changeFormState.bind(this, 'Gm')} />
        <label>liquid temperature in, C</label>
        <input className='form-control inout-sm' value={liquidTemperatureIn} onChange={this.changeFormState.bind(this, 'liquidTemperatureIn')} />
        <label>liquid temperature out, C</label>
        <input className='form-control inout-sm' value={liquidTemperatureOut} onChange={this.changeFormState.bind(this, 'liquidTemperatureOut')} />
        <h2>Output data</h2>
        <strong>Q = {Q.toFixed(2)} kW</strong>
      </div>
    );
  }
}

export default Q;
