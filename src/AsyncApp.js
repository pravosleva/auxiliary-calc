import React, { Component } from 'react';

import Q from './components/Q';
import Liquid from './components/Liquid';
import Tank from './components/Tank';
import TubeSystem from './components/TubeSystem';
import Nav from './components/Nav';


class AsyncApp extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className='container' style={{marginBottom:'35px', marginTop:'40px'}}>
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
              <TubeSystem {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AsyncApp;
