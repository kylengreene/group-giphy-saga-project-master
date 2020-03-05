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

const sagaMiddleware = createSagaMiddleware();

function* watcher() {
    yield takeEvery('SEARCH_GIPHY', searchGiphy);
    yield takeEvery('ADD_GIFS_TO_FAVORITES', addGifsToFavorites);
    yield takeEvery('GET_GIFS_FROM_FAVORITES', getGifsFromFavorites);
    yield takeEvery('CATEGORIZE_GIFS', categorizeGifs);
    yield takeEvery('DELETE_GIFS', deleteGifs);

}

function* searchGiphy(action) {
    yield axios.get(`http://api.giphy.com/v1/gifs/random?tag=${action.payload}&api_key=Ebzn0mK2MW968EX6G8hJhT83ValOZy7Y`)
        .then((response) => {
            console.log('api response:', response);
            res.send(response.data)
        }).catch((error) => {
            console.log(error);
        })
    yield put({ type: 'SET_GIF_RESULT', payload: response.data })
}

function* addGifsToFavorites(action) {
    console.log('logging giphyDescription in addGifsToFavorites', action.payload);
    const objectToPost = action.payload;
    try {
        yield axios({
            method: 'POST',
            url: '/api/favorite',
            data: {objectToPost}
        })
        yield put({
            type: 'GET_GIFS_FROM_FAVORITES'
        })
    } catch (error) {
        console.log(error);
    }
}
function* getGifsFromFavorites() {
    let favoritesArray = [];
    console.log('aloha');
    yield axios({
        method: 'GET',
        url: '/api/favorite'
    }).then((response) => {
        favoritesArray = response.data
    }).catch((error) => {
        alert('Unable to get favorites from server');
    });
    console.log('logging favoritesArray', favoritesArray);
    yield put({ type: 'SET_FAVORITES', payload: favoritesArray })
}

function* categorizeGifs() {
    console.log('logging acion.payload in categorizeGifs', action.payload);
    const objectToPost = action.payload;
    try {
        yield axios({
            method: 'PUT',
            url: `/api/favorite/${action.payload.id}`,
            data: { objectToPost }
        })
        yield put({
            type: 'GET_GIFS_FROM_FAVORITES'
        })
    } catch (error) {
        console.log(error);
    }
}

function* deleteGifs(){
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/favorite${action.payload}`
        })
        yield put({
            type: 'GET_GIFS_FROM_FAVORITES'
        })
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };
}

const searchReducer = (state= [], action ) =>{
    switch (action.type) {
        case 'SET_GIF_RESULT':
            return action.payload;
        default:
            return state;
    }
}

const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}


const storeInstance = createStore(
    combineReducers({
        favoritesReducer,
        searchReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcher);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('react-root'));

