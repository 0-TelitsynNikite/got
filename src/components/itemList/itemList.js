import React, {Component} from 'react';
import './itemList.css';
import GotService from "../../services/GotService";
import Spinner from '../spinner';

export default class ItemList extends Component {
    constructor(props) {
        super(props);
    }

    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                    <li 
                        key={Math.floor(Math.random() * 1000)}
                        onClick={() => this.props.onCharSelected( 41 + i)}
                        className="list-group-item">
                        {item.name}
                    </li>
            )
        })
    }

    render() {
        
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                
                {items}
            </ul>
        );
    }
}