import React, { Component } from 'react';
import '../css/index.css';
import Q from './Q';
import Glycole from './Glycole';

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
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
            <Q {...this.props} />
          </div>
          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
            <Glycole {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default AsyncApp;
