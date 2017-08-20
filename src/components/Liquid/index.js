import React, { Component } from 'react';
import LiquidParameters from './LiquidParameters';
//console.log(LiquidParameters.density({liquidType:'MEG', temperature:50, percentage:10}));

class Glycole extends Component {
  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeGlycoleFormState(propName, e) {
    //console.log(propName)
    //console.log(e)
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let diagram, t0, p0, freezingTemperature;

    switch(propName){
      case 'liquidType':
        liquidType = e.target.value;
        this.props.updateGlycoleFormState({ liquidType, temperature, percentage });

        diagram = LiquidParameters.density({ liquidType, temperature, percentage }).diagram;

        // --- Need to Refactiring:
        //let numOfDataObj = 0;
        //diagram.percentage.map(function(e, i){ if(percentage === e){ numOfDataObj = i }; return false; });
        //t0 = diagram.data[numOfDataObj].range.tMin;
        t0 = 7;
        //console.log(diagram.percentage);
        p0 = diagram.percentage[0];
        freezingTemperature = 0;
        // ---

        this.props.updateGlycoleFormState({ liquidType, temperature:t0, percentage:p0 });
        break;
      case 'temperature':
        this.props.updateGlycoleFormState({ liquidType, temperature:_getNumericValue(e.target.value), percentage });
        break;
      case 'percentage':
        this.props.updateGlycoleFormState({ liquidType, temperature, percentage:_getNumericValue(e.target.value) });
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
    let cp = LiquidParameters.cp({ liquidType }).result,//obj.QFormState.cp,
      ro = LiquidParameters.density({ liquidType, temperature, percentage }).result,
      Gm = obj.QFormState.Gm,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    this.props.updateQFormState({ cp, ro, Gm, liquidTemperatureIn, liquidTemperatureOut });
    //console.log(obj.LiquidFormState);
    //console.log({ cp, ro, Gm, liquidTemperatureIn, liquidTemperatureOut });
  }
  render() {
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let ro = LiquidParameters.density({liquidType, temperature, percentage}).result,
      error = LiquidParameters.density({liquidType, temperature, percentage}).error,
      densityReport = LiquidParameters.density({liquidType, temperature, percentage}).report,
      percentageRange = LiquidParameters.density({liquidType, temperature, percentage}).diagram.percentage,
      freezingTemperature = 0;

    return (
      <div>
        <h1>Liquid</h1>

        <h2>Input data</h2>
        <label>Glycole type</label>
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
        <input className='form-control input-sm' value={temperature} onChange={this.changeGlycoleFormState.bind(this, 'temperature')} />

        <h2>Output data</h2>
        <strong>ro = {ro.toFixed(2)} kg/m3</strong><br />
        <span className={error===true?'text-danger':'text-muted'}>
          Density report: {densityReport}
        </span>

      </div>
    );
  }
}

export default Glycole;
