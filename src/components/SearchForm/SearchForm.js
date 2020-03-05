import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import FavoriteList from '../FavoriteList/FavoriteList'
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem'

class SearchForm extends Component {

    state = {
        searchTerm: ''
    }

    addToFavorites = (item) => {
        this.props.dispatch({
            type: 'ADD_GIF_TO_FAVORITES',
            payload: item
        })
    }

    getGIFs = () => {
        this.props.dispatch({
            type: 'GET_GIPHY'
        })
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    searchGiphy = () => {
        this.props.dispatch({
            type:'SEARCH_GIPHY',
            payload: this.state.searchTerm
        })
        this.getGIFs();
    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.handleChange(event)} type="text" placeholder=""></input>
                <button onClick={this.searchGiphy}>Search</button>
                <ul>
                    {this.props.reduxState.searchReducer
                    .map((item)=><li key={item.id}><img src={item.url} /></li>)}
                    <button onClick={() => this.addToFavorites(this.props.reduxState.searchReducer[0])}>Add to Favorites</button>
                </ul>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(SearchForm);

//Send response object's data 