import React, { Component } from 'react';
import '../css/index.css';
import Q from './Q';
import Liquid from './Liquid';
import Tank from './Tank';
import DuctSystem from './DuctSystem';

/*
*                             COMPONENT STRUCTURE
*
* - AsyncApp
    props = {
      obj: state,
      updateQFormState (fs),
      updateGlycoleFormState (fs),
    }
*/

class AsyncApp extends Component {
  render() {
    return (
      <div className='container' style={{marginBottom:'35px'}}>
        <div className='row'>

          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
            <Liquid {...this.props} />
          </div>

          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
            <Q {...this.props} />
          </div>

          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
            <Tank {...this.props} />
          </div>

          {/*
          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>

            <h1>Something else</h1>
            <hr />
            <div className='alert alert-warning' style={{marginTop:'10px'}}>
              <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
              In process...
            </div>

          </div>
          */}
        </div>
        <div className='row'>
          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
            <DuctSystem {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default AsyncApp;
