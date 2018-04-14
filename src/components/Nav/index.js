import React, { Component } from 'react';
import LiquidParameters from '../Liquid/LiquidParameters';// For cp calc

//css..

class Nav extends Component {
  constructor(props){
    super(props);
    //this.state = {};
    //this.axiosReqForClientlist = this.axiosReqForClientlist.bind(this);
    this.toggler = this.toggler.bind(this);
  }
  toggler (e) {
    e.stopPropagation();
    // will be done by jQuery for .scroll-by-local-link
  }
  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top shadow'>
        <div className='container'>
          <div className='navbar-header'>
            <button className='navbar-toggle collapsed' type='button' data-toggle='collapse' data-target='#navbar-collapse' aria-expanded='false'>
              Toggle navigation
            </button>
            <a className='navbar-brand' href='/'>s4t</a>
          </div>
          <div className='collapse navbar-collapse' id='navbar-collapse'>
            <ul className='nav navbar-nav navbar-left'>
              <li><a href='#liquid' className='scroll-by-local-link' onClick={this.toggler}>Liquid</a></li>
              <li><a href='#q' className='scroll-by-local-link' onClick={this.toggler}>Q</a></li>
              <li><a href='#tank' className='scroll-by-local-link' onClick={this.toggler}>Tank</a></li>
              <li><a href='#tubeSystem' className='scroll-by-local-link' onClick={this.toggler}>Tube System</a></li>
            </ul>
          </div>
        </div>

      </nav>
    );
  }
}

export default Nav;
