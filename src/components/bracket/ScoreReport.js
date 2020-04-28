import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import GameData from '../shared/models/GameData';
import Button from "react-bootstrap/Button";
import { api } from '../../helpers/api';


class ScoreReport extends React.Component {
    constructor(){
        super();
        this.state = {
            tournamentCode: null,
            gameId: null,
            score1: null,
            score2: null,
            game: null
        }
    }

    async componentDidMount(){
        let response;
        let playerId = localStorage.getItem("ParticipantID"); // string
        try{
            response = api.get(`/tournaments/${this.props.match.params.tournamentsCode}/bracket/${playerId}`) // returns GameData's data
            const game = new GameData(response);
            this.setState({game: game});
            this.setState({tournamentCode: game.tournamentCode});
            this.setState({gameId: game.gameId});
        }catch(error){
            console.log('there was a problem getting the game', error)
            const testingData = {
                participant1: 'Tony Ly',
                participant2: 'Timo Boll',
                score1: null,
                score2: null,
                gameId: 4,
                gameState: 'NOTREADY',
                startTime: null,
                tournamentCode: 420420
            }
            const game = new GameData(testingData);
            this.setState({game: game});
            this.setState({tournamentCode: game.tournamentCode});
            this.setState({gameId: game.gameId});
        }
    }

    handleEnterScore(key, value) {
        this.setState({ [key]: value });
      }

    async submitScore(){
        console.log(this.state);
        try {
            const requestBody = JSON.stringify({
                tournamentCode: this.state.tournamentCode,
                gameId: this.state.gameId,
                score1: this.state.score1,
                score2: this.state.score2,
            });
                await api.put(`/tournaments/${this.state.tournamentCode}/bracket/${this.state.gameId}`);
                this.props.history.goBack(); // after submitting automatically redirect to bracket?
        }catch(error){
            console.log('there is something wrong with sending the scores', error);
        }

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
                                    this.handleEnterScore("score1", e.target.value);
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Enter score of {this.state.game.participant2}
                            </Form.Label>
                            <Form.Control
                                placeholder="1-3"
                                onChange={e => {
                                    this.handleEnterScore("score2", e.target.value);
                                }} />
                        </Form.Group>

                    </Form>

                    <Button type="button"
                        disabled={!this.state.score1 || !this.state.score2}
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