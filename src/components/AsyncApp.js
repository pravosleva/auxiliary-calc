import React, { Component } from 'react';
import '../css/index.css';
import Q from './Q';
import Glycol from './Glycol';

/*
*                             COMPONENT STRUCTURE
*
* - AsyncApp
    props = {
      obj: state,
      updateQFormState (QFormState),
    }
*/

class AsyncApp extends Component {
  render() {
    return (
      <div className='container'>
        <Q {...this.props} />
        <Glycol {...this.props} />
      </div>
    );
  }
}

export default AsyncApp;
