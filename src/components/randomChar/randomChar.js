import React, {Component} from 'react';
import './randomChar.css';
import GotService from "../../services/GotService";
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    constructor() {
        super();
        
    }

    gotService = new GotService();
    
    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = (char) => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || errorMessage) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
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
        </>
    )
}