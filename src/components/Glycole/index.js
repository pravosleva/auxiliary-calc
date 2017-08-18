import React, { Component } from 'react';
import Liquid from './Liquid';
//console.log(Liquid.density({glycoleType:'MEG', temperature:50, percentage:10}));

class Glycole extends Component {
  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeGlycoleFormState(propName, e) {
    //console.log(propName)
    //console.log(e)
    let _getNumericValue = (val) => { return (val!=="" && !isNaN(val)) ? Number(val) : "" };
    const { obj } = this.props;
    let { glycoleType, temperature, percentage } = obj.GlycoleFormState;
    let diagram, t0, p0, freezingTemperature;

    switch(propName){
      case 'glycoleType':
        glycoleType = e.target.value;
        diagram = Liquid.density({ glycoleType, temperature, percentage }).diagram;

        // --- Need to Refactiring:
        let numOfDataObj = 0;
        diagram.percentage.map(function(e, i){ if(percentage === e){ numOfDataObj = i }; return false; });
        t0 = diagram.data[numOfDataObj].range.tMin;
        //console.log(diagram.percentage);
        p0 = diagram.percentage[0];
        freezingTemperature = 0;
        // ---

        this.props.updateGlycoleFormState({ glycoleType, temperature:t0, percentage:p0 });
        break;
      case 'temperature':
        this.props.updateGlycoleFormState({ glycoleType, temperature:_getNumericValue(e.target.value), percentage });
        break;
      case 'percentage':
        this.props.updateGlycoleFormState({ glycoleType, temperature, percentage:_getNumericValue(e.target.value) });
        break;
      //...
      default: break;
    }
    this.changeQFormState();
  }
  changeQFormState(){
    // Need to update QFormState:
    const { obj } = this.props;
    let { glycoleType, temperature, percentage } = obj.GlycoleFormState;
    let cp = obj.QFormState.cp,
      ro = Liquid.density({ glycoleType, temperature, percentage }).result,
      Gm = obj.QFormState.Gm,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    this.props.updateQFormState({ cp, ro, Gm, liquidTemperatureIn, liquidTemperatureOut });
    //console.log(obj.GlycoleFormState);
    //console.log({ cp, ro, Gm, liquidTemperatureIn, liquidTemperatureOut });
  }
  render() {
    const { obj } = this.props;
    let { glycoleType, temperature, percentage } = obj.GlycoleFormState;
    //console.log(obj.GlycoleFormState);
    //...
    let ro = Liquid.density({glycoleType, temperature, percentage}).result,
      error = Liquid.density({glycoleType, temperature, percentage}).error,
      densityReport = Liquid.density({glycoleType, temperature, percentage}).msg,
      percentageRange = Liquid.density({glycoleType, temperature, percentage}).diagram.percentage,
      freezingTemperature = 0;

    return (
      <div>
        <h1>Glycole</h1>

        <h2>Input data</h2>
        <label>Glycole type</label>
        <div className='input-group'>
          <input className='form-control input-sm' value={glycoleType} onChange={this.changeGlycoleFormState.bind(this, 'glycoleType')} disabled />
          <span className="input-group-btn dropdown">
            <button className="btn btn-sm btn-secondary dropdown-toggle btn-danger" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span>{glycoleType}</span>&nbsp;&nbsp;<span className="caret"></span>
            </button>
            <ul className="dropdown-menu dropdown-menu-right" role="menu">
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="MEG"
                onClick={this.changeGlycoleFormState.bind( this, 'glycoleType', {target:{value:"MEG"}} )}
                >MEG</a></li>
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="MPG"
                onClick={this.changeGlycoleFormState.bind( this, 'glycoleType', {target:{value:"MPG"}} )}
                >MPG</a></li>
              <li><a style={{cursor:'pointer'}}
                className="dropdown-item"
                value="WATER"
                onClick={this.changeGlycoleFormState.bind( this, 'glycoleType', {target:{value:"WATER"}} )}
                >WATER</a></li>
            </ul>
          </span>
        </div>
        <label>Percentage, %</label>
        <select disabled={glycoleType==='WATER'?true:false} className='form-control input-sm' value={percentage} onChange={this.changeGlycoleFormState.bind(this, 'percentage')}>
          {
            percentageRange.map((e, i) => <option key={i} value={e}>{e}</option>)
          }
        </select>
        <label>Temperature, C</label>
        <input className='form-control input-sm' value={temperature} onChange={this.changeGlycoleFormState.bind(this, 'temperature')} />

        <h2>Output data</h2>
        <strong>ro = {ro} kg/m3</strong><br />
        <span className={error===true?'text-danger':'text-muted'}>
          Density report: {densityReport}
        </span>

      </div>
    );
  }
}

export default Glycole;
