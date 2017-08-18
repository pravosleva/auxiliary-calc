import React, { Component } from 'react';
//css..

class Q extends Component {

  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeQFormState(propName, e) {
    const { obj } = this.props;
    let cp = obj.QFormState.cp,
      ro = obj.QFormState.ro,
      Gm = obj.QFormState.Gm,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    //...
    switch(propName){
      case 'cp':
        this.props.updateQFormState({ cp: e.target.value, ro, Gm, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'ro':
        this.props.updateQFormState({ cp, ro: e.target.value, Gm, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'Gm':
        this.props.updateQFormState({ cp, ro, Gm: e.target.value, liquidTemperatureIn, liquidTemperatureOut });
        break;
      case 'liquidTemperatureIn':
        this.props.updateQFormState({ cp, ro, Gm, liquidTemperatureIn: e.target.value, liquidTemperatureOut });
        break;
      case 'liquidTemperatureOut':
        this.props.updateQFormState({ cp, ro, Gm, liquidTemperatureIn, liquidTemperatureOut: e.target.value });
        break;
      default: break;
    }
  }
  render() {
    const { obj } = this.props;
    let cp = obj.QFormState.cp,
      ro = obj.QFormState.ro,
      Gm = obj.QFormState.Gm,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    //...
    let Q = cp * Gm * ro * (liquidTemperatureIn-liquidTemperatureOut) / 3600 // to kW
    return (
      <div>
        <h1>Q by Liquid Flow</h1>

        <h2>Input data</h2>
        <label>cp, kJ/kg.K</label>
        <input className='form-control input-sm' value={cp} onChange={this.changeQFormState.bind(this, 'cp')} />
        <label>ro, kg/m3</label>
        <input disabled className='form-control input-sm' value={ro} />
        <label>Gm, m3/h</label>
        <input className='form-control input-sm' value={Gm} onChange={this.changeQFormState.bind(this, 'Gm')} />
        <label>liquid temperature in, C</label>
        <input className='form-control input-sm' value={liquidTemperatureIn} onChange={this.changeQFormState.bind(this, 'liquidTemperatureIn')} />
        <label>liquid temperature out, C</label>
        <input className='form-control input-sm' value={liquidTemperatureOut} onChange={this.changeQFormState.bind(this, 'liquidTemperatureOut')} />

        <h2>Output data</h2>
        <strong>Q = {Q.toFixed(2)} kW</strong>

      </div>
    );
  }
}

export default Q;
