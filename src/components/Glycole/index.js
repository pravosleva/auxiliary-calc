import React, { Component } from 'react';
//css..

class Glycole extends Component {
  _getNumericValue(val){ return (val!=="" && !isNaN(val)) ? Number(val) : "" }
  changeFormState(propName, e) {
    const { obj } = this.props;
    let glycolType = obj.GlycoleFormState.glycolType;
    //...
    switch(propName){
      case 'glycolType':
        this.props.updateGlycoleFormState({ glycolType: e.target.value });
        break;
      //...
      default: break;
    }
  }
  render() {
    const { obj } = this.props;
    let glycolType = obj.GlycoleFormState.glycolType;
    //...
    return (
      <div className='container'>
        <h1>Glycole</h1>
        <pre>Under Construction... <strong>{glycolType}</strong> set.</pre>
        <div className='row'>
          <div className='col-lg6 col-md-6 col-sm-6 col-xs-12'>
            <h2>Input data</h2>
            <label>Glycole type</label>
            <input className='form-control inout-sm' value={glycolType} onChange={this.changeFormState.bind(this, 'glycolType')} />

          </div>
          <div className='col-lg6 col-md-6 col-sm-6 col-xs-12'>

          </div>
        </div>
      </div>
    );
  }
}

export default Glycole;
