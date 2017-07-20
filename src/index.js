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
      updateFormState = {(fs) => store.dispatch({ type: 'UPDATE_FORM_STATE', formState: fs })}
    />,
    rootEl
  );
};
render();
store.subscribe(render);

store.subscribe( ()=>{ console.log(store.getState()) } );

//registerServiceWorker();
