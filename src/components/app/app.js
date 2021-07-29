import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from "../../services/GotService";


export default class App extends React.Component {

    gotService = new GotService();

    state = {
        toggle: false,
        error: false,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onRandom = () => {
        this.setState(state => {
            return {
                toggle: !state.toggle
            }
        })
    }


    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }
        
        const char = !this.state.toggle ? <RandomChar/> : null;
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                    {char}
                    </Col>                        
                </Row> 
                <ToggleBtn onRandom={this.onRandom}/>                  
                <CharacterPage/> 
                <Row>
                    <Col md='6'>
                        <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={ (item) => item.name }/>
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar}/>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllHouses}
                            renderItem={ (item) =>item.name }/>
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar}/>
                    </Col>
                </Row>
                </Container>
            </>
        );
    }
};

const ToggleBtn = ({onRandom}) => {
    return <button onClick={onRandom}>Toggle random character</button>;
}
