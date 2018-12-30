import React, { Component } from 'react';
import LiquidParameters from 'liquid-parameters'; // For cp calc
import Switch from 'rc-switch';
import 'js-snackbar/dist/snackbar.css';
//https://www.npmjs.com/package/js-snackbar
import { show, ACTION_TYPE } from 'js-snackbar';
//show({ text: 'Custom Error Message!', backgroundColor: '#F44336' });

import '../../css/rc-switch-custom.css';


class TubeSystem extends Component {
  constructor(props){
    super(props);
    //this.state = {};
    //this.axiosReqForClientlist = this.axiosReqForClientlist.bind(this);
    //this.render = this.render.bind(this);
    this.setOptimalDiameter = this.setOptimalDiameter.bind(this);
    this.setLiquidVolumeToTankSection = this.setLiquidVolumeToTankSection.bind(this);
  }
  changeTubePressureDropFormState(propName, e) {
    //console.log(`${e.target.value} selected`);
    const { obj } = this.props;
    let {
      tubeDiameter, tubeLength, diameterOptions,
      PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq, free_dPw_kPa, free_dPw_mAq,
      enableTubeSystem_switcher,
    } = obj.TubePressureDropFormState;
    switch(propName){
      case 'tubeDiameter': tubeDiameter = Number(e.target.value); break;
      case 'tubeLength': tubeLength = e.target.value; break;
      case 'PHE_dPw_kPa':
        PHE_dPw_kPa = e.target.value;
        PHE_dPw_mAq = Number(e.target.value)*0.1019716;
        break;
      case 'PHE_dPw_mAq':
        PHE_dPw_mAq = e.target.value;
        PHE_dPw_kPa = Number(e.target.value)/0.1019716;
        break;
      case 'Evap_dPw_kPa':
        Evap_dPw_kPa = e.target.value;
        Evap_dPw_mAq = Number(e.target.value)*0.1019716;
        break;
      case 'Evap_dPw_mAq':
        Evap_dPw_mAq = e.target.value;
        Evap_dPw_kPa = Number(e.target.value)/0.1019716;
        break;
      case 'free_dPw_kPa':
        free_dPw_kPa = e.target.value;
        free_dPw_mAq = Number(e.target.value)*0.1019716;
        break;
      case 'free_dPw_mAq':
        free_dPw_mAq = e.target.value;
        free_dPw_kPa = Number(e.target.value)/0.1019716;
        break;
      default: break;
    }
    this.props.updateTubePressureDropFormState({
      tubeDiameter, tubeLength, diameterOptions,
      PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq, free_dPw_kPa, free_dPw_mAq,
      enableTubeSystem_switcher,
    });
  }
  setLiquidVolumeToTankSection () {
    const { obj } = this.props;
    let { tubeDiameter, tubeLength, diameterOptions, PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq, free_dPw_kPa, free_dPw_mAq, enableTubeSystem_switcher } = obj.TubePressureDropFormState;
    let { workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume } = obj.TankFormState,
      liquidVolumeInTubes = (Math.PI*(tubeDiameter/2)*tubeLength)*2; // x2 - т.к. туда и обратно
    this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume: liquidVolumeInTubes });
  }
  setOptimalDiameter () {
    let myPromise = new Promise((res, rej) => { res(); });
    myPromise.then(() => {
      const { obj } = this.props;
      let { liquidType, temperature, percentage } = obj.LiquidFormState,
        { tubeDiameter, tubeLength, diameterOptions, PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq, free_dPw_kPa, free_dPw_mAq, enableTubeSystem_switcher } = obj.TubePressureDropFormState,
        volumetricFlowRate = obj.QFormState.volumetricFlowRate,
        kinematicViscosity = LiquidParameters.getKinematicViscosity({ liquidType, percentage, temperature }).result;
      for(let i=0, max=diameterOptions.length; i<max; i++){
        let Re = LiquidParameters.getRe({
          diameter: diameterOptions[i].value,
          flow: volumetricFlowRate,
          kinematicViscosity,
        }).result,
        v = LiquidParameters.getRe({ diameter: diameterOptions[i].value, flow: volumetricFlowRate, kinematicViscosity }).v;
        console.log(v)
        if (v <= 3) {
          //console.log(diameterOptions[i].value)
          tubeDiameter = diameterOptions[i].value;
          break;
        }
      }

      this.props.updateTubePressureDropFormState({ tubeDiameter, tubeLength, diameterOptions, PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq, free_dPw_kPa, free_dPw_mAq, enableTubeSystem_switcher });
    })
    .then(() => {
      const { obj } = this.props;
      let { workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume } = obj.TankFormState,
        {
          tubeDiameter, tubeLength, diameterOptions,
          //PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq,
          //enableTubeSystem_switcher,
        } = obj.TubePressureDropFormState,
        liquidVolumeInTubes = (Math.PI*(tubeDiameter/2)*tubeLength)*2; // x2 - т.к. туда и обратно
      this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume: liquidVolumeInTubes });
    })
    .then(() => {
      show({ text: 'Liquid volume in tube x2 was set to Tank section', customClass: 'snackbar-container-primary' }); // backgroundColor: 'rgb(51, 122, 183)'
    })
    .catch((err) => {
      show({ text: `${err}`, backgroundColor: '#F44336', customClass: 'snackbar-container-primary' });
    })
  }
  enableTubeSystem (ev) {
    let { TubePressureDropFormState } = this.props.obj;
    TubePressureDropFormState.enableTubeSystem_switcher = !TubePressureDropFormState.enableTubeSystem_switcher;
    this.props.updateTubePressureDropFormState( TubePressureDropFormState );
  }
  render() {
    try{
      var { obj } = this.props;
      var { liquidType, temperature, percentage } = obj.LiquidFormState;
      //let { liquidTemperatureIn, liquidTemperatureOut } = obj.QFormState;
      var { tubeDiameter, tubeLength, diameterOptions, PHE_dPw_kPa, PHE_dPw_mAq, Evap_dPw_kPa, Evap_dPw_mAq, free_dPw_kPa, free_dPw_mAq, enableTubeSystem_switcher } = obj.TubePressureDropFormState;
      var cpObj = LiquidParameters.cp({ liquidType, percentage, temperature }),
        cp = cpObj.result, cpError = cpObj.error, cpReport = cpObj.report,
        density = obj.QFormState.density,
        volumetricFlowRate = obj.QFormState.volumetricFlowRate,
        liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
        liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
      //console.log(liquidTemperatureIn, liquidTemperatureOut);
      var kinematicViscosity = LiquidParameters.getKinematicViscosity({ liquidType, percentage, temperature }).result,
        about_kinematicViscosity = LiquidParameters.getKinematicViscosity({ liquidType, percentage, temperature }).msg,
        Re = LiquidParameters.getRe({
          diameter: tubeDiameter,
          flow: volumetricFlowRate,
          kinematicViscosity,
        }).result,
        v = LiquidParameters.getRe({ diameter: tubeDiameter, flow: volumetricFlowRate, kinematicViscosity }).v;
      var tubeSystemPressureDrop = LiquidParameters.getTubePressureDrop({
        Re, tubeLength, tubeDiameter, density, v
      });

      //console.log(Re, v)
    } catch (err) {
      show({ text: `${err}`, backgroundColor: '#F44336' });
    }

    // For other progects in this site:
    //localStorage.setItem('coolingCapacity', Q);

    return (
      <div>
        <h1 id='tubeSystem'>Tube System</h1>
        <hr />

        <h2>Input data</h2>
        <label>Tube Diameter</label>
        <div className='input-group'>
          <span className='input-group-btn'>
            <button onClick={this.setOptimalDiameter} className='btn btn-sm btn-primary'>Set Optimal Diameter</button>
          </span>
          <select className="form-control input-sm" value={tubeDiameter} onChange={this.changeTubePressureDropFormState.bind(this, 'tubeDiameter')}>
            {/*
            <option value='0.0127'>1/2 inch</option>
            <option value='0.01905'>3/4</option>
            <option value='0.0254'>1</option>
            <option value='0.0381'>1 1/2</option>
            <option value='0.04445'>1 3/4</option>
            <option value='0.0508'>2</option>
            <option value='0.0635'>2 1/2</option>
            <option value='0.06985'>2 3/4</option>
            <option value='0.0762'>3</option>
            <option value='0.1016'>4</option>
            <option value='0.127'>5</option>
            <option value='0.1524'>6</option>
            <option value='0.1778'>7</option>
            <option value='0.2032'>8</option>

            <option value='0.022'>22 mm</option>
            <option value='0.044'>44 mm</option>
            <option value='0.060'>60 mm</option>
            <option value='0.080'>80 mm</option>
            <option value='0.100'>100 mm</option>
            */}
            { diameterOptions.map((e, i, a) => <option key={i} value={e.value}>{e.label}</option>) }
          </select>

        </div>
        <label>Tube Length, m</label>
        <div className='input-group'>
          <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={tubeLength} onChange={this.changeTubePressureDropFormState.bind(this, 'tubeLength')} />
          <span className='input-group-btn'>
            <button onClick={this.setLiquidVolumeToTankSection} className='btn btn-sm btn-primary'
              style={{marginBottom: '0px'}}>Set Tube System Vol. to Tank section</button>
          </span>
        </div>

        <h2>Output data*</h2>
        <blockquote>
          <span className={v>3?'text-danger':''}>dPw = {tubeSystemPressureDrop.kPa.toFixed(1)} kPa x2 = {(tubeSystemPressureDrop.kPa*2).toFixed(0)} kPa<br />
          = {(tubeSystemPressureDrop.kPa*2*0.1019716).toFixed(1)} mAq <span style={{color: 'lightgray'}}>= {(tubeSystemPressureDrop.bar*2).toFixed(1)} bar</span></span><br/>
        </blockquote>
        <div className='well well-sm text-muted' style={{marginTop:'10px'}}>
          Re = {Re.toFixed(1)}<br />
          <span style={{color: v>3?'tomato':'inherit'}}>v = {v.toFixed(1)} m/s</span><br />
          kV = {kinematicViscosity.toFixed(2)} <span style={{opacity: '.5'}}>x10<sup>-6</sup></span> m<sup>2</sup>/s<br />
          <code className='text-muted'>{about_kinematicViscosity}</code><br />
        </div>

        <h2>Additional</h2>
        <label>Tube System {enableTubeSystem_switcher ? `enabled` : `disabled`}</label>
        <br />
        <center>
          <Switch
            id={"_nothing"}
            onChange={this.enableTubeSystem.bind(this)}
            checked={enableTubeSystem_switcher}
            checkedChildren={'ON'}
            unCheckedChildren={'OFF'}

          />
        </center>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>PHE, kPa</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={PHE_dPw_kPa} onChange={this.changeTubePressureDropFormState.bind(this, 'PHE_dPw_kPa')} />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>PHE, mAq</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={PHE_dPw_mAq} onChange={this.changeTubePressureDropFormState.bind(this, 'PHE_dPw_mAq')} />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>Evap, kPa</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={Evap_dPw_kPa} onChange={this.changeTubePressureDropFormState.bind(this, 'Evap_dPw_kPa')} />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>Evap, mAq</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={Evap_dPw_mAq} onChange={this.changeTubePressureDropFormState.bind(this, 'Evap_dPw_mAq')} />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>Free, kPa</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={free_dPw_kPa} onChange={this.changeTubePressureDropFormState.bind(this, 'free_dPw_kPa')} />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
            <label>Free, mAq</label>
            <input type='number' style={{MozAppearance:'textfield'}} className='form-control input-sm' value={free_dPw_mAq} onChange={this.changeTubePressureDropFormState.bind(this, 'free_dPw_mAq')} />
          </div>
        </div>
        <label>Description</label>
        <div className='well well-sm text-muted' style={{marginTop:'0px'}}>
          PHE - Plate Heat Exchanger<br/>
          Evap - User Evaporator<br />
          Free - Additional Free Pressure Drop<br />
          <code>So, dPw <b>total</b> = {enableTubeSystem_switcher ? `Tube System* + ` : null}PHE + Evap + Free</code>
        </div>
        <blockquote>
          dPw <b>total</b> = {((enableTubeSystem_switcher ? Number(tubeSystemPressureDrop.kPa)*2 : 0.0) +Number(PHE_dPw_kPa)+Number(Evap_dPw_kPa)+Number(free_dPw_kPa)).toFixed(0)} kPa<br/>
          = {enableTubeSystem_switcher ? `${(tubeSystemPressureDrop.kPa*2*0.1019716).toFixed(1)} + ` : null}{Number(PHE_dPw_mAq).toFixed(1)} + {Number(Evap_dPw_mAq).toFixed(1)} + {Number(free_dPw_mAq).toFixed(1)} = {( (enableTubeSystem_switcher ? Number(tubeSystemPressureDrop.kPa*2*0.1019716) : 0.0)+Number(PHE_dPw_mAq)+Number(Evap_dPw_mAq)+Number(free_dPw_mAq)).toFixed(1)} mAq
        </blockquote>

      </div>
    );
  }
}

export default TubeSystem;
