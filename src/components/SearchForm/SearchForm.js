import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

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
                <Input onChange={(event) => this.handleChange(event)} type="text" placeholder=""></Input>
                <Button onClick={this.searchGiphy}>Search</Button>
                <List>
                    {this.props.reduxState.searchReducer
                    .map((item)=><ListItem class="searchResult" key={item.id}><img alt="gif" src={item.url} width="300px"/></ListItem>)}
                    <Button onClick={() => this.addToFavorites(this.props.reduxState.searchReducer[0])}>Add to Favorites</Button>
                </List>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(SearchForm);