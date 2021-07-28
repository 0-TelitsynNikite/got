import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';


export default class App extends React.Component {

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
                    
                </Container>
            </>
        );
    }
};

const ToggleBtn = ({onRandom}) => {
    return <button onClick={onRandom}>Toggle random character</button>;
}
