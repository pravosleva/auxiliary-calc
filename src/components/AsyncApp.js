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
        <Q {...this.props} />
        <Glycole {...this.props} />
      </div>
    );
  }
}

export default AsyncApp;
