import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux'

const productData = require('./productData.json');

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState)
        return productData;
    else
        return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch(err) {
    console.log(err);
  }
};

// use testData as the default argument, which will be used if state is undefined (as it will be when the app starts
function Reducer(state = loadState() , action) {
  switch (action.type) {
    case 'UPDATE':
        let newState = [...state];
        newState[action.index] = action.data
        return newState;
    default:
      return state
  }
}
const store = createStore(Reducer)
store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <React.StrictMode>
        <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
