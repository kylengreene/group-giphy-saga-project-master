import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App.js';

import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
function* watcher(){

}

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
    combineReducers({
       
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcher);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('react-root'));

