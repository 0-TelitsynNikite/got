import React, {Component} from 'react';
import './randomChar.css';
import GotService from "../../services/GotService";

export default class RandomChar extends Component {

    constructor() {
        super();
        this.updateChar();
    }
    gotService = new GotService();
    state = {
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null
    }

    updateChar() {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(char => {
                this.setState(
                    {
                        name: char.name,
                        gender: char.gender,
                        born: char.born,
                        died: char.died,
                        culture: char.culture
                    }
                )
            })
    }

    render() {
        const {name, gender, born, died, culture} = this.state;

        return (
            <div className="random-block rounded">
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">{gender} </span>
                        <span>male</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">{born} </span>
                        <span>11.03.1039</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">{died} </span>
                        <span>13.09.1089</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">{culture} </span>
                        <span>Anarchy</span>
                    </li>
                </ul>
            </div>
        );
    }
}