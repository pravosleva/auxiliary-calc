import React, { Component } from 'react';
import LiquidParameters from '../Liquid/LiquidParameters';// For cp calc
//import interpolate from '../interpolate';

class TubePressureDrop extends Component {
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
    let { tubeDiameter, tubeLength, diameterOptions } = obj.TubePressureDropFormState;
    switch(propName){
      case 'tubeDiameter':
        this.props.updateTubePressureDropFormState({ tubeDiameter: Number(e.target.value), tubeLength, diameterOptions });

        //let { workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume } = obj.TankFormState,
        //  liquidVolumeInTubes = (Math.PI*(tubeDiameter/2)*tubeLength)*2; // x2 - т.к. туда и обратно
        //this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume: liquidVolumeInTubes });

        break;
      case 'tubeLength':
        this.props.updateTubePressureDropFormState({ tubeDiameter, tubeLength: e.target.value, diameterOptions });
        //...
        break;
      default: break;
    }
  }
  setLiquidVolumeToTankSection () {
    const { obj } = this.props;
    let { tubeDiameter, tubeLength, diameterOptions } = obj.TubePressureDropFormState;
    let { workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume } = obj.TankFormState,
      liquidVolumeInTubes = (Math.PI*(tubeDiameter/2)*tubeLength)*2; // x2 - т.к. туда и обратно
    this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume: liquidVolumeInTubes });
  }
  setOptimalDiameter () {
    let myPromise = new Promise((res, rej) => { res(); });
    myPromise.then(() => {
      const { obj } = this.props;
      let { liquidType, temperature, percentage } = obj.LiquidFormState,
        { tubeDiameter, tubeLength, diameterOptions } = obj.TubePressureDropFormState,
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

      this.props.updateTubePressureDropFormState({ tubeDiameter, tubeLength, diameterOptions });
    })
    .then(() => {
      const { obj } = this.props;
      let { workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume } = obj.TankFormState,
        { tubeDiameter, tubeLength, diameterOptions } = obj.TubePressureDropFormState,
        liquidVolumeInTubes = (Math.PI*(tubeDiameter/2)*tubeLength)*2; // x2 - т.к. туда и обратно
      this.props.updateTankFormState({ workTimeCoefficient, operatingModeTime, totalLiquidDuctSystemVolume: liquidVolumeInTubes });
    })
    .then(() => {
      alert('Liquid volume in tube x2 was set to Tank section')
    })
    .catch((err) => {alert(err)})
  }

  render() {
    const { obj } = this.props;
    let { liquidType, temperature, percentage } = obj.LiquidFormState;
    let { tubeDiameter, tubeLength, diameterOptions } = obj.TubePressureDropFormState;
    let cpObj = LiquidParameters.cp({ liquidType, percentage, temperature }),
      cp = cpObj.result, cpError = cpObj.error, cpReport = cpObj.report,
      density = obj.QFormState.density,
      volumetricFlowRate = obj.QFormState.volumetricFlowRate,
      liquidTemperatureIn = obj.QFormState.liquidTemperatureIn,
      liquidTemperatureOut = obj.QFormState.liquidTemperatureOut;
    //console.log(liquidTemperatureIn, liquidTemperatureOut);
    let kinematicViscosity = LiquidParameters.getKinematicViscosity({ liquidType, percentage, temperature }).result,
      about_kinematicViscosity = LiquidParameters.getKinematicViscosity({ liquidType, percentage, temperature }).msg,
      Re = LiquidParameters.getRe({
        diameter: tubeDiameter,
        flow: volumetricFlowRate,
        kinematicViscosity,
      }).result,
      v = LiquidParameters.getRe({ diameter: tubeDiameter, flow: volumetricFlowRate, kinematicViscosity }).v,
      pressureDrop = LiquidParameters.getTubePressureDrop({
        Re, tubeLength, tubeDiameter, density, v
      });
    //console.log(Re, v)

    // For other progects in this site:
    //localStorage.setItem('coolingCapacity', Q);

    return (
      <div>
        <h1>Tube Pressure Drop</h1>
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
        <input className='form-control input-sm' value={tubeLength} onChange={this.changeTubePressureDropFormState.bind(this, 'tubeLength')} />

        <h2>Output data</h2>
        <blockquote>
          <span className={v>3?'text-danger':''}>dPw = {pressureDrop.kPa.toFixed(1)} kPa = {pressureDrop.bar.toFixed(0)} bar</span>
        </blockquote>
        <div className='well well-sm text-muted' style={{marginTop:'10px'}}>
          Re = {Re.toFixed(1)}<br />
          <span style={{color: v>3?'tomato':'inherit'}}>v = {v.toFixed(1)} m/s</span><br />
          kV = {kinematicViscosity.toFixed(2)} <span style={{opacity: '.5'}}>x10<sup>-6</sup></span> m<sup>2</sup>/s<br />
          <code className='text-muted'>{about_kinematicViscosity}</code><br />

          <button onClick={this.setLiquidVolumeToTankSection} className='btn btn-sm btn-default'
            style={{marginTop: '10px', marginBottom: '5px'}}>Set Luquid Volume in tubes</button>
        </div>


      </div>
    );
  }
}

export default TubePressureDrop;
