import React, { Component } from 'react';
import Density from './Density';
//console.log(Density.density({glycoleType:'MEG', temperature:50, percentage:10}));

class Glycole extends Component {
  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeFormState(propName, e) {
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    const { obj } = this.props;
    let { glycoleType, temperature, percentage, freezingTemperature } = obj.GlycoleFormState;
    //...
    switch(propName){
      case 'glycoleType':
        this.props.updateGlycoleFormState({ glycoleType: e.target.value, temperature, percentage, freezingTemperature });
        break;
      case 'temperature':
        this.props.updateGlycoleFormState({ glycoleType, temperature: _getNumericValue(e.target.value), percentage, freezingTemperature });
        break;
      case 'percentage':
        this.props.updateGlycoleFormState({ glycoleType, temperature, percentage: _getNumericValue(e.target.value), freezingTemperature });
        break;
      case 'freezingTemperature':
        this.props.updateGlycoleFormState({ glycoleType, temperature, percentage, freezingTemperature: _getNumericValue(e.target.value) });
        break;
      //...
      default: break;
    }
  }
  render() {
    const { obj } = this.props;
    let { glycoleType, temperature, percentage, freezingTemperature } = obj.GlycoleFormState;
    //...
    let density = Density.density({glycoleType, temperature, percentage});
    return (
      <div className='container'>
        <h1>Glycole</h1>
        <pre>Under Construction... glycolType <strong>{glycoleType}</strong> was set.</pre>
        <div className='row'>
          <div className='col-lg6 col-md-6 col-sm-6 col-xs-12'>
            <h2>Input data</h2>
            <label>Glycole type</label>
            <input className='form-control inout-sm' value={glycoleType} onChange={this.changeFormState.bind(this, 'glycoleType')} disabled />
            <label>Percentage</label>
            <input className='form-control inout-sm' value={percentage} onChange={this.changeFormState.bind(this, 'percentage')} />
            <label>Temperature</label>
            <input className='form-control inout-sm' value={temperature} onChange={this.changeFormState.bind(this, 'temperature')} />
            <label>Freezing Temperature</label>
            <input className='form-control inout-sm' value={freezingTemperature} onChange={this.changeFormState.bind(this, 'freezingTemperature')} disabled />

          </div>
          <div className='col-lg6 col-md-6 col-sm-6 col-xs-12'>
            <h2>Output data</h2>
            <strong>ro = {density} kg/m3</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default Glycole;
