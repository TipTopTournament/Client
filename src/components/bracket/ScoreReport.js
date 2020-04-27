import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import GameData from '../shared/models/GameData';
import Button from "react-bootstrap/Button";


class ScoreReport extends React.Component {
    constructor(){
        super();
        this.state = {
            game : null
        }
    }

    async componentDidMount(){
        //try{


        //}catch(error){
            //console.log('there was a problem getting the game', error)
            const testingData = {
                participant1: 'Tony Ly',
                participant2: 'Timo Boll',
                score1: null,
                score2: null,
                gameId: 4,
                gameState: 'NOTREADY',
                tournamentCode: 4
            }
            const game = new GameData(testingData);
            this.setState({game: game});
    }

    handleEnterScore(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
      }

    render() {
        if (!this.state.game) {
            return (
                <Container>
                    <Row>
                        <Col />
                        <Col><h1>Your next game has not been determend yet</h1></Col>
                        <Col />
                    </Row>
                </Container>
            );
        }
        return (
            <Container>
                <Row>
                    <Col />
                    <Col>
                        {this.state.game.participant1} vs {this.state.game.participant2}
                    </Col>
                    <Col />
                </Row>
                <Row>
                    <Col />
                    <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Enter score of {this.state.game.participant1}
                            </Form.Label>
                            <Form.Control
                                placeholder="1-3"
                                onChange={e => {
                                    this.handleEnterScore(this.state.game.participant1, e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Enter score of {this.state.game.participant2}
                            </Form.Label>
                            <Form.Control
                                placeholder="1-3"
                                onChange={e => {
                                    this.handleEnterScore(this.state.game.participant2, e.target.value);
                                }} />
                        </Form.Group>

                    </Form>

                    <Button type="button"
                        disabled={!this.state.game.score1 || !this.state.game.score2}
                        onClick={() => {
                            this.submitScore();
                        }}>
                            Submit
                    </Button>
                    </Col>
                    <Col />
                </Row>
            </Container>
        );
    }
}

export default withRouter(ScoreReport);