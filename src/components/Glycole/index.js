import React, { Component } from 'react';
import Liquid from './Liquid';
//console.log(Liquid.density({glycoleType:'MEG', temperature:50, percentage:10}));

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
    let density = Liquid.density({glycoleType, temperature, percentage});
    return (
      <div>
        <h1>Glycole</h1>

        <h2>Input data</h2>
        <label>Glycole type</label>
        <div className='input-group'>
          <input className='form-control input-sm' value={glycoleType} onChange={this.changeFormState.bind(this, 'glycoleType')} disabled />
          <span className="input-group-btn dropdown">
            <button className="btn btn-sm btn-secondary dropdown-toggle btn-danger" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>{glycoleType}</span>&nbsp;&nbsp;<span className="caret"></span>
            </button>
            <ul className="dropdown-menu" role="menu">
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="MEG"
                onClick={this.changeFormState.bind(this, 'glycoleType')}
                >MEG</a></li>
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="MPG"
                onClick={this.changeFormState.bind(this, 'glycoleType')}
                >MPG</a></li>
              {/*<li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="WATER"
                onClick={this.changeFormState.bind(this, 'glycoleType')}
                >WATER</a></li>*/}
            </ul>
          </span>
        </div>
        <label>Percentage, %</label>
        <input className='form-control input-sm' value={percentage} onChange={this.changeFormState.bind(this, 'percentage')} />
        <label>Temperature, C</label>
        <input className='form-control input-sm' value={temperature} onChange={this.changeFormState.bind(this, 'temperature')} />
        <label>Freezing Temperature, C</label>
        <input className='form-control input-sm' value={freezingTemperature} onChange={this.changeFormState.bind(this, 'freezingTemperature')} disabled />


        <h2>Output data</h2>
        <strong>ro = {density} kg/m3</strong>

      </div>
    );
  }
}

export default Glycole;
