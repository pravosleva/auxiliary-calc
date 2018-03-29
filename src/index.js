import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './css/index.css';
import AsyncApp from './components/AsyncApp';
//import registerServiceWorker from './registerServiceWorker';
import stt from './reducers';

const store = createStore(
  stt,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <AsyncApp
      obj = {store.getState()}
      updateQFormState = {(fs) => store.dispatch({ type: 'UPDATE_Q_FORM_STATE', QFormState: fs })}
      updateLiquidFormState = {(fs) => store.dispatch({ type: 'UPDATE_LIQUID_FORM_STATE', LiquidFormState: fs })}
      updateTankFormState = {(fs) => store.dispatch({ type: 'UPDATE_TANK_FORM_STATE', TankFormState: fs })}
      //
      updateTubePressureDropFormState = {(fs) => store.dispatch({ type: 'UPDATE_TUBE_PRESSURE_DROP_FORM_STATE', TubePressureDropFormState: fs })}
    />,
    rootEl
  );
};
render();
store.subscribe(render);

//store.subscribe( ()=>{ console.log(store.getState()) } );

//registerServiceWorker();
