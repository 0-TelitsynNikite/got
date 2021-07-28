import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';


export default class App extends React.Component {

    state = {
        toggle: false,
        error: false
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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
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
