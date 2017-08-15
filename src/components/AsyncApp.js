import React, { Component } from 'react';
import '../css/index.css';
import Q from './Q';

/*
*                             COMPONENT STRUCTURE
*
* - AsyncApp
    props = {
      obj: state,
      updateFormState (formState),
    }
*/

class AsyncApp extends Component {
  render() {
    return (
      <div className='container'>
        <Q {...this.props} />
      </div>
    );
  }
}

export default AsyncApp;
