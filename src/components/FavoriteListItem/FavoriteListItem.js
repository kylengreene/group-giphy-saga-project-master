import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { Button } from '@material-ui/core';

class FavoriteListItem extends Component {

    removeItem = () => {
        this.props.dispatch({
            type: 'DELETE_GIFS',
            payload: this.props.item.id
        })
    }

    changeCategory = (event, id) => {
        this.props.dispatch({
            type: 'CATEGORIZE_GIFS',
            payload: {
                category_id: event.target.value,
                id: id
            }
        })
    }


    render() {
        return (
            <div>
                <img alt="gif" src={this.props.item.url} width="300px" /><br />
                <Button onClick={this.removeItem}>Remove from favorites</Button>
                <FormControl>
                    <Select onChange={(event) => this.changeCategory(event, this.props.item.id)} defaultValue={this.props.item.category_id}>
                        <option value="1">Funny</option>
                        <option value="2">Sports</option>
                        <option value="3">Memes</option>
                        <option value="4">NSFW</option>
                    </Select>
                </FormControl>
            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavoriteListItem);