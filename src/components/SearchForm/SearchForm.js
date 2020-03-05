import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import FavoriteList from '../FavoriteList/FavoriteList'
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem'



class SearchForm extends Component {

    state = {
        searchTerm: ''
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
                <button onClick={this.searchGiphy}>Search!</button>
                <ul>
                    {this.props.reduxState.searchReducer
                    .map((item)=><li key={item.data.id}>{item.data.img_url}</li>)}
                </ul>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(SearchForm);