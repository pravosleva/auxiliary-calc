import React, { Component } from 'react';
import LiquidParameters from './LiquidParameters';
//console.log(LiquidParameters.density({liquidType:'MEG', temperature:50, percentage:10}));

class Glycole extends Component {
  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeGlycoleFormState(propName, e) {
    //console.log(propName)
    //console.log(e)
    //let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let diagram, t0, p0, freezingTemperature;

    switch(propName){
      case 'liquidType':
        liquidType = e.target.value;
        this.props.updateLiquidFormState({ liquidType, temperature, percentage });

        diagram = LiquidParameters.density({ liquidType, temperature, percentage }).diagram;

        // --- Need to Refactiring:
        //let numOfDataObj = 0;
        //diagram.percentage.map(function(e, i){ if(percentage === e){ numOfDataObj = i }; return false; });
        //t0 = diagram.data[numOfDataObj].range.tMin;
        //t0 = 7;
        t0 = temperature;
        //console.log(diagram.percentage);
        p0 = diagram.percentage[0];
        freezingTemperature = LiquidParameters.freezingTemperature({ liquidType, percentage: p0 });
        // ---

        this.props.updateLiquidFormState({ liquidType, temperature:t0, percentage:p0, freezingTemperature });
        break;
      case 'temperature':
        freezingTemperature = LiquidParameters.freezingTemperature({ liquidType, percentage });
        this.props.updateLiquidFormState({ liquidType, temperature: this._getNumericValue(e.target.value), percentage, freezingTemperature });
        break;
      case 'percentage':
        freezingTemperature = LiquidParameters.freezingTemperature({ liquidType, percentage: this._getNumericValue(e.target.value) });
        this.props.updateLiquidFormState({ liquidType, temperature, percentage: this._getNumericValue(e.target.value), freezingTemperature });
        break;
      case 'freezingTemperature':
        freezingTemperature = this._getNumericValue(e.target.value);
        //percentage = LiquidParameters.freezingTemperature({ liquidType, freezingTemperature });
        this.props.updateLiquidFormState({ liquidType, temperature, percentage, freezingTemperature });
        break;
      //...
      default: break;
    }
    this.changeQFormState();
  }
  changeQFormState(){
    // Need to update QFormState:
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let density = LiquidParameters.density({ liquidType, temperature, percentage }).result,
      volumetricFlowRate = obj.QFormState.volumetricFlowRate,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    this.props.updateQFormState({ density, volumetricFlowRate, liquidTemperatureIn, liquidTemperatureOut });
  }
  render() {
    //console.clear();
    const { obj } = this.props;
    let { liquidType, temperature, percentage, freezingTemperature } = obj.LiquidFormState;
    let density = LiquidParameters.density({liquidType, temperature, percentage}).result,
      densityError = LiquidParameters.density({liquidType, temperature, percentage}).error,
      densityReport = LiquidParameters.density({liquidType, temperature, percentage}).report,
      percentageRange = LiquidParameters.density({liquidType, temperature, percentage}).diagram.percentage;
    return (
      <div>
        <h1>Liquid</h1>
        <hr />

        <h2>Input data</h2>
        <label>Liquid type</label>
        <div className='input-group'>
          <input className='form-control input-sm' value={liquidType} onChange={this.changeGlycoleFormState.bind(this, 'liquidType')} disabled />
          <span className="input-group-btn dropdown">
            <button className="btn btn-sm btn-secondary dropdown-toggle btn-default" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>{liquidType}</span>&nbsp;&nbsp;<span className="caret"></span>
            </button>
            <ul className="dropdown-menu dropdown-menu-right" role="menu">
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="MEG"
                onClick={this.changeGlycoleFormState.bind( this, 'liquidType', {target:{value:"MEG"}} )}
                >ETHYLENE GLYCOLE</a></li>
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="MPG"
                onClick={this.changeGlycoleFormState.bind( this, 'liquidType', {target:{value:"MPG"}} )}
                >PROPYLENE GLYCOLE</a></li>
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="WATER"
                onClick={this.changeGlycoleFormState.bind( this, 'liquidType', {target:{value:"WATER"}} )}
                >WATER</a></li>
            </ul>
          </span>
        </div>
        <label>Percentage, %</label>
        {/*
        <select disabled={liquidType==='WATER'?true:false} className='form-control input-sm' value={percentage} onChange={this.changeGlycoleFormState.bind(this, 'percentage')}>
          {
            percentageRange.map((e, i) => <option key={i} value={e}>{e}</option>)
          }
        </select>
        */}
        <input disabled={liquidType==='WATER'?true:false} className='form-control input-sm' value={percentage} onChange={this.changeGlycoleFormState.bind(this, 'percentage')} />

        <label>Liquid Temperature, C</label>
        <input disabled={true} className='form-control input-sm' value={temperature} onChange={this.changeGlycoleFormState.bind(this, 'temperature')} />

        <label>Freezing Temperature, C</label>
        <input disabled={true} className='form-control input-sm' value={freezingTemperature.toFixed(2)} onChange={this.changeGlycoleFormState.bind(this, 'freezingTemperature')} />

        <h2>Output data</h2>
        <div className='well well-sm text-muted' style={{marginTop:'10px'}}>
          <p>
            Liquid density for the conditions
            <pre>density = {density.toFixed(2)} kg/m3</pre>
          </p>
          <p>
            <code className={densityError===true?'text-danger':'text-muted'}>
              {densityReport}
            </code>
          </p>
        </div>

      </div>
    );
  }
}

export default Glycole;
